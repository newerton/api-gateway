import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { extractRequest } from '../util';

/**
 * Retrieves the current Keycloak logged-in user.
 * @since 1.5.0
 */
export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): unknown => {
    const [req] = extractRequest(ctx);
    return req.user;
  },
);
