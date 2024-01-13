import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

import { KeycloakServerConfig } from '@core/@shared/infrastructure/config/env';

export default () => ({
  keycloak: {
    debug: KeycloakServerConfig.KEYCLOAK_DEBUG === '1',
    baseInternalUrl: `${KeycloakServerConfig.KEYCLOAK_BASE_INTERNAL_URL}`,
    baseExternalUrl: `${KeycloakServerConfig.KEYCLOAK_BASE_EXTERNAL_URL}`,
    realm: KeycloakServerConfig.KEYCLOAK_REALM || '',
    clientId: KeycloakServerConfig.KEYCLOAK_API_GATEWAY_CLIENT_ID || '',
    secret: KeycloakServerConfig.KEYCLOAK_API_GATEWAY_SECRET || '',
    publicKey: KeycloakServerConfig.KEYCLOAK_PUBLIC_KEY || '',
    policyEnforcement: PolicyEnforcementMode.ENFORCING,
    tokenValidation: TokenValidation.OFFLINE,
    logLevels: ['log', 'debug', 'error', 'verbose', 'warn'],
    useNestLogger: false,
    user_credentials: {
      clientId: KeycloakServerConfig.KEYCLOAK_USERS_CREDENTIALS_CLIENT_ID || '',
      secret: KeycloakServerConfig.KEYCLOAK_USERS_CREDENTIALS_SECRET || '',
      grant_type: 'client_credentials',
    },
  },
});
