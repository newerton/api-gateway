import type { Config } from '@jest/types';

import jestconfig from '../../jest.config';

export default {
  ...jestconfig,
  rootDir: './../../',
  modulePathIgnorePatterns: ['.*\\..*e2e.spec\\.ts$'],
} as Config.InitialOptions;
