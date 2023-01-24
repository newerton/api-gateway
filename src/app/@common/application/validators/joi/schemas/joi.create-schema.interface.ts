import { AnySchema } from 'joi';

export interface CreateSchema {
  createSchema(): AnySchema;
}
