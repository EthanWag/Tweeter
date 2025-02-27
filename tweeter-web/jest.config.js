module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx','js', 'json', 'node'],
    testMatch: ['**/*.test.ts','**/*.test.tsx'], // Match TypeScript test files
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mock__/styleMock.js"
    }
  };