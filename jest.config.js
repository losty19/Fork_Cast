module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testMatch: ['**/__test__/**/*.test.ts']
    // testMatch: ['**/__realtest__/**/*.test.ts'] // This uses actual API calls to test the code
  };