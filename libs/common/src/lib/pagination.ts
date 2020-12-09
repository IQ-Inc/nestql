import { IPaginationLinks, Pagination } from 'nestjs-typeorm-paginate';

export interface IPagination<E> extends Pagination<E> {}
