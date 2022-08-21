import { CreateSchema } from 'src/common/schemas/joi/joi.create.schema.factory';

import * as JoiBase from 'joi';

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
