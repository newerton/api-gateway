import { KafkaServerConfig } from '@core/@shared/infrastructure/config/env/kafka-server.config';

export default () => ({
  kafka: {
    brokers: `${KafkaServerConfig.KAFKA_BROKER_HOST}:${KafkaServerConfig.KAFKA_BROKER_PORT}`,
  },
});
