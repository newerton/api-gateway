import { PolicyEnforcementMode, TokenValidation } from '../auth/keycloak';

export default () => ({
  keycloak: {
    debug: process.env.DEBUG === '1',
    baseUrl: `${process.env.KEYCLOAK_BASE_URL}/auth`,
    realm: process.env.KEYCLOAK_REALM || '',
    clientId: process.env.KEYCLOAK_CLIENT_ID || '',
    secret: process.env.KEYCLOAK_SECRET || '',
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
