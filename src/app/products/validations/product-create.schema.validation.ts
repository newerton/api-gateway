import { z } from 'zod';

import { CreateValidationSchema } from '@app/@common/application/validators/zod/schemas';

export class ProductCreateSchemaValidation implements CreateValidationSchema {
  createSchema(): z.Schema {
    return z.object({
      title: z.string({
        description: 'Título do produto',
      }),
      description: z.string({
        description: 'Descrição do produto',
      }),
      price: z
        .number({
          description: 'Preço do produto',
        })
        .min(1),
      discount_percentage: z
        .number({
          description: 'Desconto do produto',
        })
        .int()
        .min(0)
        .max(100),
      warranty: z.string({
        description: 'Garantia do produto',
      }),
      available: z
        .boolean({
          description: 'Disponibilidade do produto',
        })
        .default(false),
    });
  }
}
