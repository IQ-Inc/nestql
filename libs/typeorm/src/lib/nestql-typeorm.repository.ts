import { IDomainModel, IPaginate, IParser, IQuery, NESTQL_PAGINATE, removeExtraFields } from '@nestql/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Socket } from 'socket.io';
import { FindManyOptions, Repository } from 'typeorm';
import { createTypeormRelationsArray } from './relations.transform';

/**
 * TODO
 */
export abstract class NestQLTypeormRepository<
  Entity extends IDomainModel<{ id: IdType }, object>,
  IdType extends string | number = string
> {
  readonly subscribers = new Map<
    string,
    {
      channel: string;
      socket: Socket;
      listener: () => Promise<any>;
      ids: IdType[];
    }
  >();

  constructor(protected readonly repo: Repository<Entity>) {}

  async provisionPaginationSubscription<Q extends IQuery<Entity>>(
    socket: Socket,
    channel: string,
    query: Q,
    options?: Omit<FindManyOptions<Entity>, 'relations'>
  ) {
    const listener = () => this.paginate(query, options);
    this.subscribers.set(socket.id, {
      socket,
      channel,
      listener,
      ids: (await this.repo.find(options)).map((d) => d.id),
    });
    socket.emit(channel, await listener());
  }

  async provisionSingleEntitySubscription<Q extends IQuery<Entity>>(
    socket: Socket,
    channel: string,
    id: IdType,
    query: Q
  ) {
    const listener = () => this.findOneOrFail(id, query);
    this.subscribers.set(socket.id, {
      socket,
      channel,
      listener,
      ids: [(await this.repo.findOneOrFail(id)).id],
    });
    socket.emit(channel, await listener());
  }

  removeListener(socket: Socket) {
    this.subscribers.delete(socket.id);
  }

  async trigger(id: IdType | IdType[]) {
    const triggeredIds = Array.isArray(id) ? id : [id];

    for (const { channel, socket, listener, ids } of this.subscribers.values()) {
      // Only trigger subscribers who are watching Entities of ids.
      if (triggeredIds.some((t) => ids.includes(t))) {
        const data = await listener();
        socket.emit(channel, data);
        break;
      }
    }
  }

  async findOneOrFail<Q extends IQuery<Entity>>(id: IdType, query: Q) {
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.findOneOrFail(id, { relations });
    return removeExtraFields(e, query);
  }

  async findOne<Q extends IQuery<Entity>>(id: IdType, query: Q) {
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.findOne(id, { relations });
    return removeExtraFields(e, query);
  }

  async findMany<Q extends IQuery<Entity>>(ids: IdType[], query: Q) {
    if (ids.length === 0) return [];
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.findByIds(ids, { relations });
    return removeExtraFields(e, query);
  }

  async findAll<Q extends IQuery<Entity>>(query: Q) {
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.find({ relations });
    return removeExtraFields(e, query);
  }

  async paginate<Q extends IQuery<Entity>>(
    query: Q,
    options?: Omit<FindManyOptions<Entity>, 'relations'>
  ): Promise<Pagination<IParser<Entity, Q>>> {
    let entities: Pagination<Entity>;
    const relations = createTypeormRelationsArray<Entity>(query);

    const paginateOptions = (query as IPaginate)[NESTQL_PAGINATE];
    if (paginateOptions) {
      entities = await paginate(
        this.repo,
        { page: paginateOptions.__page, limit: paginateOptions.__limit },
        { ...options, relations }
      );
    } else {
      entities = this.createPaginationMetaFromAllEntities(await this.repo.find({ ...options, relations }));
    }

    removeExtraFields(entities.items, query);
    return (entities as unknown) as Pagination<IParser<Entity, Q>>;
  }

  private createPaginationMetaFromAllEntities(entities: Entity[]): Pagination<Entity> {
    return {
      items: entities,
      meta: {
        itemCount: entities.length,
        totalItems: entities.length,
        itemsPerPage: entities.length,
        currentPage: 1,
        totalPages: 1,
      },
    };
  }

  async upsert<Q extends IQuery<Entity>>(entity: Entity, query: Q) {
    const res = await this.repo.save(entity);
    this.trigger(entity.id);
    return removeExtraFields(res, query);
  }

  async upsertMany<Q extends IQuery<Entity>>(entities: Entity[], query: Q) {
    if (entities.length === 0) return [];
    await this.repo.save(entities);
    this.trigger(entities.map((e) => e.id));
    return this.paginate(query);
  }

  async delete(id: IdType): Promise<IdType> {
    await this.repo.delete(id);
    this.trigger(id);
    return id;
  }

  async deleteMany(ids: IdType[]): Promise<IdType[]> {
    if (ids.length === 0) return [];
    await this.repo.delete(ids as string[]);
    this.trigger(ids);
    return ids;
  }
}
