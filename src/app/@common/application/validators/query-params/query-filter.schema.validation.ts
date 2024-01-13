import { z } from 'zod';

import { CreateValidationSchema } from '../zod/schemas';

export type QueryFilterSchemaProps = {
  page?: number;
};

export class QueryFilterSchema implements CreateValidationSchema {
  createSchema(): z.Schema {
    return z.object({
      page: z.number().int().min(1).default(1),
    });
  }
}
