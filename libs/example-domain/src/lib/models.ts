import { IManyToMany, IManyToOne, IOneToMany, IOneToOne } from '@nestql/common';

export interface User {
  id: string;
  name: string;
  todos: IOneToMany<User, Todo>;
  privateProfile: IOneToOne<User, UserPrivate>;
}

export interface UserPrivate {
  id: string;
  birthday: Date;
  publicProfile: IOneToOne<UserPrivate, User>;
}

export interface Todo {
  id: string;
  title: string;
  content: string;
  dateCreated: Date;
  ownedBy: IManyToOne<Todo, User>;
  tags: IManyToMany<Todo, Tag>;
}

export interface Tag {
  id: string;
  text: string;
  todos: IManyToMany<Tag, Todo>;
}
