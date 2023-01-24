import * as JoiBase from 'joi';

import { CreateSchema } from '../joi/schemas/joi.create-schema.interface';

export type QueryFilterSchemaProps = {
  page?: number;
};

const Joi = JoiBase;

export class QueryFilterSchema implements CreateSchema {
  createSchema(): JoiBase.ObjectSchema {
    return Joi.object({
      page: Joi.number().integer().min(1).default(1),
    });
  }
}
