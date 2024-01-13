import type { Config } from '@jest/types';

import jestconfig from '../../jest.config';

export default {
  ...jestconfig,
  rootDir: './../../',
  testRegex: '.*\\.e2e.spec\\.ts$',
} as Config.InitialOptions;
