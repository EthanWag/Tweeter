module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testMatch: ['**/*.test.ts'], // Match TypeScript test files
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
      },
  };