const config = {
  verbose: true,
  rootDir: '.',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
  ],
  coveragePathIgnorePatterns: [
    '/<rootDir>/src/index.jsx/',
    '/<rootDir>/src/testUtils.js/'
  ]
};

module.exports = config;