import { Code } from '@core/@shared/domain/error/Code';
import { Exception } from '@core/@shared/domain/exception/Exception';

export const mockAmqpConnection = {
  publish: jest.fn((_exchange, _routingKey, message) => {
    if (!message) {
      throw Exception.new({
        code: Code.BAD_REQUEST,
        overrideMessage: 'Bad Request',
      });
    }
  }),
};
