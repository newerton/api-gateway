import * as dotenv from 'dotenv';
import { from, logger } from 'env-var';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const env = from(process.env, { logger });

export class RabbitMQServerConfig {
  public static readonly RABBITMQ_PROTOCOL: string =
    this.envRequiredAsString('RABBITMQ_PROTOCOL');

  public static readonly RABBITMQ_HOST: string =
    this.envRequiredAsString('RABBITMQ_HOST');

  public static readonly RABBITMQ_PORT: number =
    this.envRequiredAsPortNumber('RABBITMQ_PORT');

  public static readonly RABBITMQ_USER: string =
    this.envRequiredAsString('RABBITMQ_USER');

  public static readonly RABBITMQ_PASSWORD: string =
    this.envRequiredAsString('RABBITMQ_PASSWORD');

  public static readonly RABBITMQ_CERTIFICATE_AUTH: string = env
    .get('RABBITMQ_CERTIFICATE_AUTH')
    .asString();

  private static envRequiredAsString(key): string {
    return env.get(key).required().asString();
  }

  private static envRequiredAsPortNumber(key): number {
    return env.get(key).required().asPortNumber();
  }
}
