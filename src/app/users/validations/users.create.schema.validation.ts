import * as JoiBase from 'joi';
import { CreateSchema } from 'src/common/schemas/Joi.create.schema.factory';
import MessagesSchema from 'src/common/schemas/Joi.messages.schema';

const Joi = JoiBase;

export class UsersCreateSchema implements CreateSchema {
  createSchema(): JoiBase.ObjectSchema {
    return Joi.object({
      firstName: Joi.string()
        .label('Primeiro nome')
        .error((errors: any) => {
          errors.forEach((err: JoiBase.ErrorReport) => {
            console.log('err.code', err);
          });
          return errors;
        })
        .messages(MessagesSchema),
      lastName: Joi.string()
        .label('Sobrenome')
        .error((errors: any) => {
          errors.forEach((err: JoiBase.ErrorReport) => {
            console.log('err.code', err);
          });
          return errors;
        })
        .messages(MessagesSchema),
      passwordCurrent: Joi.string()
        .min(6)
        .max(30)
        .required()
        .error((errors: any) => {
          errors.forEach((err: JoiBase.ErrorReport) => {
            console.log('err.code', err);
          });
          return errors;
        })
        .messages(MessagesSchema),
      repeatPasswordCurrent: Joi.string()
        .required()
        .valid(Joi.ref('passwordCurrent'))
        .error((errors: any) => {
          errors.forEach((err: JoiBase.ErrorReport) => {
            console.log('err.code', err);
          });
          return errors;
        })
        .messages(MessagesSchema),
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
      deviceToken: Joi.string()
        .label('Device Token')
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
