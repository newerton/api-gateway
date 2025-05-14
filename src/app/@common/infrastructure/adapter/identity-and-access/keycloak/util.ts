import { ContextType, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';

type GqlContextType = 'graphql' | ContextType;

export const extractRequest = (
  context: ExecutionContext,
): [Request, Response] => {
  let request: Request;
  let response: Response;

  // Check if request is coming from graphql or http
  if (context.getType() === 'http') {
    // http request
    const httpContext = context.switchToHttp();

    request = httpContext.getRequest();
    response = httpContext.getResponse();
  } else if (context.getType<GqlContextType>() === 'graphql') {
    let gql: any;
    // Check if graphql is installed
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      gql = require('@nestjs/graphql');
    } catch {
      throw new Error('@nestjs/graphql is not installed, cannot proceed');
    }

    // graphql request
    const gqlContext = gql.GqlExecutionContext.create(context).getContext();

    request = gqlContext.req;
    response = gqlContext.res;
  }

  return [request, response];
};

export const parseToken = (token: string): string => {
  const parts = token.split('.');
  return JSON.parse(Buffer.from(parts[1], 'base64').toString()) as string;
};
