import { KafkaServerConfig } from '@core/@shared/infrastructure/config/env';

const brokers = [];
for (let i = 0; i < KafkaServerConfig.KAFKA_REPLICA_COUNT; i++) {
  brokers.push(
    `${KafkaServerConfig[`KAFKA_BROKER_${i}_HOST`]}:${KafkaServerConfig[`KAFKA_BROKER_${i}_PORT`]}`,
  );
}

export default () => ({
  kafka: {
    brokers,
  },
});
