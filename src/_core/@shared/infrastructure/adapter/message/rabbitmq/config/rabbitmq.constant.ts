import { RabbitMQServerConfig } from '@core/@shared/infrastructure/config/env';

const protocol = RabbitMQServerConfig.RABBITMQ_PROTOCOL;
const host = RabbitMQServerConfig.RABBITMQ_HOST;
const port = RabbitMQServerConfig.RABBITMQ_PORT;
const user = RabbitMQServerConfig.RABBITMQ_USER;
const pass = RabbitMQServerConfig.RABBITMQ_PASSWORD;

export const RABBITMQ_URI = `${protocol}://${user}:${pass}@${host}:${port}`;

export const RABBITMQ_CERTIFICATE_AUTH =
  RabbitMQServerConfig.RABBITMQ_CERTIFICATE_AUTH;
