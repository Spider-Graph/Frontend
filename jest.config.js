module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json',
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './src/__mocks__/mocks.js',
    '\\.(css|less|scss)$': './src/__mocks__/mocks.js',
    ...moduleNameMapper,
  },
  preset: 'ts-jest',
};
