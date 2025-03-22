module.exports = {
    preset: "ts-jest",
    testMatch: ["**/*.test.tsx", "**/*.test.ts"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        '\\.css$': 'jest-transform-css',
    },
    moduleNameMapper: {
        "/\.module\.css$/": "jest-css-modules"
    },
    resolver: undefined,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/*.stories.tsx",
        "!src/**/*.css",
        "!src/constants/**/*",
        "!src/**/testData/**",
        "!src/main.tsx",
        "!src/App.tsx"
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
};