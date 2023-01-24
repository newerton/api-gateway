import * as dotenv from 'dotenv';
import { from, logger } from 'env-var';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const env = from(process.env, { logger });

export class KafkaServerConfig {
  public static readonly KAFKA_BROKER_HOST: string =
    this.envRequiredAsString('KAFKA_BROKER_HOST');

  public static readonly KAFKA_BROKER_PORT: number =
    this.envRequiredAsPortNumber('KAFKA_BROKER_PORT');

  private static envRequiredAsString(key): string {
    return env.get(key).required().asString();
  }

  private static envRequiredAsPortNumber(key): number {
    return env.get(key).required().asPortNumber();
  }
}
