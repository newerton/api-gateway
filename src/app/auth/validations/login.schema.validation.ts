import * as JoiBase from 'joi';
import { CreateSchema } from 'src/common/schemas/Joi.create.schema.factory';
import MessagesSchema from 'src/common/schemas/Joi.messages.schema';

const Joi = JoiBase;

export class LoginSchema implements CreateSchema {
  createSchema(): JoiBase.ObjectSchema {
    return Joi.object({
      email: Joi.string()
        .email()
        .lowercase()
        .label('E-mail')
        .error((errors: any) => {
          errors.forEach((err: JoiBase.ErrorReport) => {
            console.log('err.code', err);
          });
          return errors;
        })
        .messages(MessagesSchema),
      password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .label('Senha')
        .error((errors: any) => {
          errors.forEach((err: JoiBase.ErrorReport) => {
            console.log('err.code', err);
          });
          return errors;
        })
        .messages(MessagesSchema),
    });
  }
}
