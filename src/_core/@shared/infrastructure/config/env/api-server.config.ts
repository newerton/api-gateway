import * as dotenv from 'dotenv';
import { from, logger } from 'env-var';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const env = from(process.env, { logger });

export class ApiServerConfig {
  public static readonly ENV: string = env
    .get('NODE_ENV')
    .default('development')
    .asString();

  public static readonly PORT: number = env
    .get('API_PORT')
    .required()
    .asPortNumber();

  public static readonly LOG_ENABLE: boolean = env
    .get('API_LOG_ENABLE')
    .required()
    .asBool();

  public static readonly LIGHTSHIP_PORT: number = env
    .get('API_LIGHTSHIP_PORT')
    .required()
    .asPortNumber();

  public static readonly AUTH_ENGINE_PORT: number = env
    .get('API_AUTH_ENGINE_PORT')
    .required()
    .asPortNumber();

  public static readonly USER_ENGINE_PORT: number = env
    .get('API_USER_ENGINE_PORT')
    .required()
    .asPortNumber();

  public static readonly PRODUCT_ENGINE_PORT: number = env
    .get('API_PRODUCT_ENGINE_PORT')
    .required()
    .asPortNumber();
}
