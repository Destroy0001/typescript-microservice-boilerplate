module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  moduleNameMapper: {
    '@app/(.*)':'<rootDir>/src/$1',
    '@orm/(.*)':'<rootDir>/src/orm/$1',
    '@config':'<rootDir>/src/config',
    '@config/(.*)':'<rootDir>/src/config/$1',
    '@constants':'<rootDir>/src/constants',
    '@constants/(.*)':'<rootDir>/src/constants/$1',
  }
};
