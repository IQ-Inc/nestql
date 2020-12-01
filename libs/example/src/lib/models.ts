import { IDomainModel } from '@nestql/common';

/*
  _   _
 | | | |___ ___ _ _
 | |_| (_-</ -_) '_|
  \___//__/\___|_|

*/

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  dateCreated: Date;
}

interface IUserRelations {
  ownedJobs: JobPost[];
  privateData: UserPrivate;
}

export type User = IDomainModel<IUser, IUserRelations>;

/*
  _   _               ___     _          _
 | | | |___ ___ _ _  | _ \_ _(_)_ ____ _| |_ ___
 | |_| (_-</ -_) '_| |  _/ '_| \ V / _` |  _/ -_)
  \___//__/\___|_|   |_| |_| |_|\_/\__,_|\__\___|

*/

interface IUserPrivate {
  id: string;
  ssn: number;
  birthDate: Date;
}

interface IUserPrivateRelations {
  publicData: User;
}

export type UserPrivate = IDomainModel<IUserPrivate, IUserPrivateRelations>;

/*
     _     _      ___        _
  _ | |___| |__  | _ \___ __| |_
 | || / _ \ '_ \ |  _/ _ (_-<  _|
  \__/\___/_.__/ |_| \___/__/\__|

*/

interface IJobPost {
  id: string;
  jobTitle: string;
  datePosted: Date;
}

interface IJobPostRelations {
  ownedBy: User;
}

export type JobPost = IDomainModel<IJobPost, IJobPostRelations>;
