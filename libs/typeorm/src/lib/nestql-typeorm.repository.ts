import { IDomainModel, IParser, IQuery, removeExtraFields, NESTQL_PAGINATE, IPaginate } from '@nestql/common';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { createTypeormRelationsArray } from './relations.transform';

/**
 * TODO
 */
export abstract class NestQLTypeormRepository<
  Entity extends IDomainModel<{ id: IDType }, object>,
  IDType extends string | number = string
> {
  constructor(protected readonly repo: Repository<Entity>) {}

  async findOneOrFail<Q extends IQuery<Entity>>(id: string | number, query: Q) {
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.findOneOrFail(id, { relations });
    return removeExtraFields(e, query);
  }

  async findOne<Q extends IQuery<Entity>>(id: string | number, query: Q) {
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.findOne(id, { relations });
    return removeExtraFields(e, query);
  }

  async findMany<Q extends IQuery<Entity>>(ids: IDType[], query: Q) {
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

  async paginate<Q extends IQuery<Entity>>(query: Q): Promise<Pagination<IParser<Entity, Q>>> {
    let entities: Pagination<Entity>;
    const relations = createTypeormRelationsArray<Entity>(query);

    const paginateOptions = (query as IPaginate)[NESTQL_PAGINATE];
    if (paginateOptions) {
      entities = await paginate(
        this.repo,
        { page: paginateOptions.__page, limit: paginateOptions.__limit },
        { relations }
      );
    } else {
      entities = this.createPaginationMetaFromAllEntities(await this.repo.find({ relations }));
    }

    removeExtraFields(entities.items, query);
    return entities as Pagination<IParser<Entity, Q>>;
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
    await this.repo.save(entity);
    return this.findOneOrFail(entity.id, query);
  }

  async upsertMany<Q extends IQuery<Entity>>(entities: Entity[], query: Q) {
    if (entities.length === 0) return [];
    await this.repo.save(entities);
    return this.paginate(query);
  }

  async delete(id: IDType): Promise<IDType> {
    await this.repo.delete(id);
    return id;
  }

  async deleteMany(ids: IDType[]): Promise<IDType[]> {
    if (ids.length === 0) return [];
    await this.repo.delete(ids as string[]);
    return ids;
  }
}
