import { PolicyEnforcementMode, TokenValidation } from '../auth/keycloak';
export default () => ({
  kafka: {
    brokers: `${process.env.KAFKA_BROKER_HOST}:${process.env.KAFKA_BROKER_PORT}`,
  },
  keycloak: {
    debug: process.env.KEYCLOAK_DEBUG === '1',
    baseInternalUrl: `${process.env.KEYCLOAK_BASE_INTERNAL_URL}`,
    baseExternalUrl: `${process.env.KEYCLOAK_BASE_EXTERNAL_URL}`,
    realm: process.env.KEYCLOAK_REALM || '',
    clientId: process.env.KEYCLOAK_API_GATEWAY_CLIENT_ID || '',
    secret: process.env.KEYCLOAK_API_GATEWAY_SECRET || '',
    publicKey: process.env.KEYCLOAK_PUBLIC_KEY || '',
    policyEnforcement: PolicyEnforcementMode.ENFORCING,
    tokenValidation: TokenValidation.OFFLINE,
    logLevels: ['log', 'debug', 'error', 'verbose', 'warn'],
    useNestLogger: false,
    user_credentials: {
      clientId: process.env.KEYCLOAK_USERS_CREDENTIALS_CLIENT_ID || '',
      secret: process.env.KEYCLOAK_USERS_CREDENTIALS_SECRET || '',
      grant_type: 'client_credentials',
    },
  },
});
