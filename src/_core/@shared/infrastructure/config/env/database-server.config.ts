import * as dotenv from 'dotenv';
import { from, logger } from 'env-var';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const env = from(process.env, { logger });

export class DatabaseServerConfig {
  public static readonly DB_VENDOR: string =
    this.envRequiredAsString('DB_VENDOR');

  public static readonly DB_ADDR: string = this.envRequiredAsString('DB_ADDR');

  public static readonly DB_DATABASE: string =
    this.envRequiredAsString('DB_DATABASE');

  public static readonly DB_PORT: number =
    this.envRequiredAsPortNumber('DB_PORT');

  public static readonly DB_USER: string = this.envRequiredAsString('DB_USER');

  public static readonly DB_PASSWORD: string =
    this.envRequiredAsString('DB_PASSWORD');

  public static readonly DB_LOGGING: boolean = env
    .get('DB_LOGGING')
    .required()
    .asBool();

  public static readonly DBAUTH: string = env.get('DBAUTH').asString();

  private static envRequiredAsString(key): string {
    return env.get(key).required().asString();
  }

  private static envRequiredAsPortNumber(key): number {
    return env.get(key).required().asPortNumber();
  }
}
