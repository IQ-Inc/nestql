import { createTypeormRelationsArray, IDomainModel, Parser, Query, removeExtraFields } from '@nestql/common';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';

/**
 * TODO
 */
export abstract class NestQLTypeormRepository<Entity extends IDomainModel<{ id: string | number }, object>> {
  constructor(protected readonly repo: Repository<Entity>) {}

  async findOneOrFail<Q extends Query<Entity>>(id: string | number, query: Q) {
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.findOneOrFail(id, { relations });
    return removeExtraFields(e, query) as Parser<Entity, Q>;
  }

  async findOne<Q extends Query<Entity>>(id: string | number, query: Q) {
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.findOne(id, { relations });
    return removeExtraFields(e, query) as Parser<Entity, Q>;
  }

  // async findMany<Q extends Query<Entity>>(ids: Array<string | number>, q: Q) {
  //   if (ids.length === 0) return [];
  //   return this.query((alias, qb) => qb.where(`${alias}.id IN(:...ids)`, { ids }), relations);
  // }

  async findAll<Q extends Query<Entity>>(query: Q) {
    const relations = createTypeormRelationsArray<Entity>(query);
    const e = await this.repo.find({ relations });
    return removeExtraFields(e, query) as Parser<Entity, Q>;
  }

  //   paginate<RK extends RKeys = never>(
  //     options: IPaginationOptions,
  //     relations: RK[],
  //     query?: (
  //       alias: string,
  //       qb: SelectQueryBuilder<Join<Entity, Relations, RK>>
  //     ) => SelectQueryBuilder<Join<Entity, Relations, RK>>
  //   ): Promise<Pagination<Join<Entity, Relations, RK>>> {
  //     const alias = 'e';

  //     let qb = this.repo.createQueryBuilder(alias) as SelectQueryBuilder<Join<Entity, Relations, RK>>;

  //     for (const r of relations) {
  //       qb = qb.leftJoinAndSelect(`${alias}.${r}`, r);
  //     }

  //     if (query) {
  //       qb = query(alias, qb);
  //     }

  //     return paginate<Join<Entity, Relations, RK>>(qb, options);
  //   }

  //   query<RK extends RKeys = never>(
  //     query: (
  //       alias: string,
  //       qb: SelectQueryBuilder<Join<Entity, Relations, RK>>
  //     ) => SelectQueryBuilder<Join<Entity, Relations, RK>>,
  //     relations: RK[]
  //   ): Promise<Join<Entity, Relations, RK>[]> {
  //     const alias = 'e';

  //     let qb = this.repo.createQueryBuilder(alias) as SelectQueryBuilder<Join<Entity, Relations, RK>>;

  //     for (const r of relations) {
  //       qb = qb.leftJoinAndSelect(`${alias}.${r}`, r);
  //     }

  //     qb = query(alias, qb);

  //     return qb.getMany();
  //   }

  async upsert<Q extends Query<Entity>>(entity: Entity, query: Q) {
    await this.repo.save(entity);
    return this.findOneOrFail(entity.id, query);
  }

  //   async upsertMany<RK extends RKeys = never>(
  //     entities: Array<Entity & Partial<Relations>>,
  //     relations: RK[]
  //   ): Promise<Join<Entity, Relations, RK>[]> {
  //     if (entities.length === 0) return [];
  //     await this.repo.save(entities as DeepPartial<Join<Entity, Relations, RK>>[]);
  //     const ids = entities.map((e) => e.id);
  //     return this.findMany(ids, relations);
  //   }

  //   async delete(id: UID): Promise<UID> {
  //     await this.repo.delete(id);
  //     return id;
  //   }

  //   async deleteMany(ids: UID[]): Promise<UID[]> {
  //     if (ids.length === 0) return [];
  //     await this.repo.delete(ids);
  //     return ids;
  //   }
}
