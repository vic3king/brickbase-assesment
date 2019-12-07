module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/**/*.{js,jsx,mjs}"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\", "db"],
  testURL: "http://localhost",
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  verbose: true,
  modulePathIgnorePatterns: ["index.js", "coverage", "jest.config.js"],
  coverageThreshold: {
    global: {
      // branches: 80,
      // functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
