import { ApiServerConfig } from '@core/@shared/infrastructure/config/env';

describe('ApiServerConfig', () => {
  test('Should validate ENV config attribute', () => {
    const apiServerConfig = ApiServerConfig.ENV;
    expect(typeof apiServerConfig === 'string').toBeTruthy();
    expect(typeof apiServerConfig === 'string').not.toBeFalsy();
  });

  test('Shold validate PORT', () => {
    const apiServerConfig = ApiServerConfig.PORT;
    expect(typeof apiServerConfig === 'number').toBeTruthy();
    expect(typeof apiServerConfig === 'number').not.toBeFalsy();
  });

  test('Shold validate LOG_ENABLE', () => {
    const apiServerConfig = ApiServerConfig.LOG_ENABLE;
    expect(typeof apiServerConfig === 'boolean').toBeTruthy();
    expect(typeof apiServerConfig === 'boolean').not.toBeFalsy();
  });

  test('Shold validate LIGHTSHIP_PORT', () => {
    const apiServerConfig = ApiServerConfig.LIGHTSHIP_PORT;
    expect(typeof apiServerConfig === 'number').toBeTruthy();
    expect(typeof apiServerConfig === 'number').not.toBeFalsy();
  });

  test('Shold validate AUTH_ENGINE_PORT', () => {
    const apiServerConfig = ApiServerConfig.AUTH_ENGINE_PORT;
    expect(typeof apiServerConfig === 'number').toBeTruthy();
    expect(typeof apiServerConfig === 'number').not.toBeFalsy();
  });

  test('Shold validate USER_ENGINE_PORT', () => {
    const apiServerConfig = ApiServerConfig.USER_ENGINE_PORT;
    expect(typeof apiServerConfig === 'number').toBeTruthy();
    expect(typeof apiServerConfig === 'number').not.toBeFalsy();
  });

  test('Shold validate PRODUCT_ENGINE_PORT', () => {
    const apiServerConfig = ApiServerConfig.PRODUCT_ENGINE_PORT;
    expect(typeof apiServerConfig === 'number').toBeTruthy();
    expect(typeof apiServerConfig === 'number').not.toBeFalsy();
  });
});
