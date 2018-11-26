module.exports = {
    verbose: true,
    clearMocks: true,
    testEnvironment: "node",
    collectCoverage: true,
    modulePathIgnorePatterns: [
        "<rootDir>/dist/",
        "<rootDir>/node_modules/",
        "<rootDir>/client/dist/",
        "<rootDir>/client/node_modules/",
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/dist/",
        "<rootDir>/node_modules/",
        "<rootDir>/client/dist/",
        "<rootDir>/client/node_modules/",
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: [
        "js",
        "jsx",
        "json",
        "node",
        "ts",
        "tsx",
    ],
    collectCoverageFrom: [
        "<rootDir>/**/*{ts,tsx}",
    ],
};
