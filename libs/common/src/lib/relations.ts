import { UnArray } from '@nestql/util';

// TODO use as clause mapped types instead of unknown.

export type IOneToOne<Self, Relation> = {
  [K in keyof Relation]: keyof Relation[K] extends keyof Self ? unknown : Relation[K];
};

export type IOneToMany<Self, Relation> = {
  [K in keyof Relation]: Relation[K] extends IManyToOne<Relation, Self> ? unknown : Relation[K];
}[];

export type IManyToOne<Self, Relation> = {
  [K in keyof Relation]: Relation[K] extends IOneToMany<Relation, Self> ? unknown : Relation[K];
};

export type IManyToMany<Self, Relation> = {
  [K in keyof Relation]: keyof UnArray<Relation[K]> extends keyof Self ? unknown : Relation[K];
}[];
