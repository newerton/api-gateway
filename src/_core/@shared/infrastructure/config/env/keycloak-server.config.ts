import * as dotenv from 'dotenv';
import { from, logger } from 'env-var';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const env = from(process.env, { logger });

export class KeycloakServerConfig {
  public static readonly KEYCLOAK_DEBUG: string =
    this.envRequiredAsString('KEYCLOAK_DEBUG');

  public static readonly KEYCLOAK_BASE_EXTERNAL_URL: string =
    this.envRequiredAsString('KEYCLOAK_BASE_EXTERNAL_URL');

  public static readonly KEYCLOAK_BASE_INTERNAL_URL: string =
    this.envRequiredAsString('KEYCLOAK_BASE_INTERNAL_URL');

  public static readonly KEYCLOAK_REALM: string =
    this.envRequiredAsString('KEYCLOAK_REALM');

  public static readonly KEYCLOAK_API_GATEWAY_CLIENT_ID: string =
    this.envRequiredAsString('KEYCLOAK_API_GATEWAY_CLIENT_ID');

  public static readonly KEYCLOAK_API_GATEWAY_SECRET: string =
    this.envRequiredAsString('KEYCLOAK_API_GATEWAY_SECRET');

  public static readonly KEYCLOAK_PUBLIC_KEY: string = this.envRequiredAsString(
    'KEYCLOAK_PUBLIC_KEY',
  );

  public static readonly KEYCLOAK_USERS_CREDENTIALS_CLIENT_ID: string =
    this.envRequiredAsString('KEYCLOAK_USERS_CREDENTIALS_CLIENT_ID');

  public static readonly KEYCLOAK_USERS_CREDENTIALS_SECRET: string =
    this.envRequiredAsString('KEYCLOAK_USERS_CREDENTIALS_SECRET');

  private static envRequiredAsString(key): string {
    return env.get(key).required().asString();
  }

  private static envRequiredAsPortNumber(key): number {
    return env.get(key).required().asPortNumber();
  }
}
