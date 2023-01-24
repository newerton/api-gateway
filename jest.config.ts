import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      '@swc/jest',
      {
        $schema: 'https://json.schemastore.org/swcrc',
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
          },
          target: 'es2017',
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        sourceMaps: 'inline',
        module: {
          type: 'es6',
          noInterop: true,
        },
      },
    ],
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(t|j)s',
    '!<rootDir>/src/main.(t|J)s',
    '!<rootDir>/src/**/*.dto.(t|J)s',
    '!<rootDir>/src/**/*.module.(t|J)s',
    '!<rootDir>/src/**/migrations/*',
    '!<rootDir>/src/app/@common/**/swagger.config.ts',
    '!<rootDir>/src/app/@common/documentation/*',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
} as Config.InitialOptions;
