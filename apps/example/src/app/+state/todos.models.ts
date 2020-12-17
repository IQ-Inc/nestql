import { createStoreModelFromQuery, IStoreModel } from '@nestql/common';
import { Todo } from '@nestql/example-domain';

type Model = Todo[];

export const TodosQueryModel = createStoreModelFromQuery<Model>()({
  id: true,
  content: true,
  ownedBy: {
    id: true,
    name: true,
    privateProfile: {
      birthday: true,
    },
  },
  tags: {
    id: true,
    text: true,
  },
});

export type TodosEntity = IStoreModel<Model, typeof TodosQueryModel>;
