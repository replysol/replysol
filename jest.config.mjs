import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  clearMocks: true,
  collectCoverageFrom: [
    "src/lib/**/*.{ts,tsx}",
    "src/components/admin/**/*.{ts,tsx}",
    "src/views/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/test/**/*.spec.{ts,tsx}"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

export default createJestConfig(customJestConfig);
