import { createQueryModel, IParser, IStoreModel } from '@nestql/common';
import { JobPost } from '@nestql/example-domain';

export const JobPostQueryModel = createQueryModel<JobPost[]>()([
  {
    id: true,
    ownedBy: {
      id: true,
      firstName: true,
    },
    __paginate: 'all',
  },
]);

export type IJobPostQueryModel = IStoreModel<JobPost, typeof JobPostQueryModel>;
