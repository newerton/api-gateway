import { CoreApiResponse } from '@core/@shared/domain/api/CoreApiResponse';

describe('CoreApiResponse', () => {
  describe('success', () => {
    test('When input args are empty, expect it creates success response with default parameters', () => {
      const response = CoreApiResponse.success();
      expect(response).toBeUndefined();
    });

    test('When input args are set, expect it creates success response with custom parameters', () => {
      const customMessage = 'Success Response.';
      const customData = {
        message: customMessage,
      };

      const response = CoreApiResponse.success(customData);
      expect(response.message).toBe(customMessage);
    });
  });

  describe('error', () => {
    test('When input args are empty, expect it creates error response with default parameters', () => {
      const response: CoreApiResponse<unknown> = CoreApiResponse.error();

      expect(response.code).toBe(500);
      expect(response.error).toBe('INTERNAL_SERVER_ERROR');
      expect(response.message).toBe('Internal server error');
      expect(response.details).toEqual([]);
    });

    test('When input args are set, expect it creates error response with custom parameters', () => {
      const customCode = 404;
      const customError = 'NOT_FOUND';
      const customMessage = 'Resource not found.';
      const customDetail: Record<string, unknown>[] = [
        { result: customMessage },
      ];

      const response: CoreApiResponse<unknown> = CoreApiResponse.error(
        customCode,
        customError,
        customMessage,
        customDetail,
      );

      expect(response.code).toBe(customCode);
      expect(response.error).toBe(customError);
      expect(response.message).toBe(customMessage);
      expect(response.details).toEqual(customDetail);
    });
  });
});
