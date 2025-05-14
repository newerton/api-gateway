import * as dotenv from 'dotenv';
import { from, logger } from 'env-var';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const env = from(process.env, { logger });

export class KafkaServerConfig {
  public static readonly KAFKA_REPLICA_COUNT: number =
    this.envRequiredAsPortNumber('KAFKA_REPLICA_COUNT');

  public static readonly KAFKA_BROKER_0_HOST: string = this.envRequiredAsString(
    'KAFKA_BROKER_0_HOST',
  );

  public static readonly KAFKA_BROKER_0_PORT: number =
    this.envRequiredAsPortNumber('KAFKA_BROKER_0_PORT');

  public static readonly KAFKA_BROKER_1_HOST: string = this.envRequiredAsString(
    'KAFKA_BROKER_1_HOST',
  );

  public static readonly KAFKA_BROKER_1_PORT: number =
    this.envRequiredAsPortNumber('KAFKA_BROKER_1_PORT');

  public static readonly KAFKA_BROKER_2_HOST: string = this.envRequiredAsString(
    'KAFKA_BROKER_2_HOST',
  );

  public static readonly KAFKA_BROKER_2_PORT: number =
    this.envRequiredAsPortNumber('KAFKA_BROKER_2_PORT');

  private static envRequiredAsString(key: string): string {
    return env.get(key).required().asString();
  }

  private static envRequiredAsPortNumber(key: string): number {
    return env.get(key).required().asPortNumber();
  }
}
