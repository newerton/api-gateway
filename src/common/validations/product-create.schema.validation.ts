import * as JoiBase from 'joi';
import { CreateSchema } from '../schemas/joi/joi.create.schema.factory';
import MessagesSchema from '../schemas/joi/joi.messages.schema';

const Joi = JoiBase;

export class ProductCreateSchema implements CreateSchema {
  createSchema(): JoiBase.ObjectSchema {
    return Joi.object({
      title: Joi.string()
        .required()
        .label('Título')
        .error((errors: any) => {
          errors.forEach((err: any) => {
            console.log('Validation', err.code, err.local as any);
          });
          return errors;
        })
        .messages(MessagesSchema),
      description: Joi.string()
        .required()
        .label('Descrição')
        .error((errors: any) => {
          errors.forEach((err: any) => {
            console.log('Validation', err.code, err.local as any);
          });
          return errors;
        })
        .messages(MessagesSchema),
      price: Joi.number()
        .min(1)
        .precision(2)
        .required()
        .label('Preço')
        .error((errors: any) => {
          errors.forEach((err: any) => {
            console.log('Validation', err.code, err.local as any);
          });
          return errors;
        })
        .messages(MessagesSchema),
      discount_percentage: Joi.number()
        .integer()
        .min(0)
        .max(100)
        .label('Desconto (%)')
        .error((errors: any) => {
          errors.forEach((err: any) => {
            console.log('Validation', err.code, err.local as any);
          });
          return errors;
        })
        .messages(MessagesSchema),
      warranty: Joi.string()
        .required()
        .label('Garantia')
        .error((errors: any) => {
          errors.forEach((err: any) => {
            console.log('Validation', err.code, err.local as any);
          });
          return errors;
        })
        .messages(MessagesSchema),
      available: Joi.boolean()
        .default(false)
        .label('Disponibilidade')
        .error((errors: any) => {
          errors.forEach((err: any) => {
            console.log('Validation', err.code, err.local as any);
          });
          return errors;
        })
        .messages(MessagesSchema),
    });
  }
}
