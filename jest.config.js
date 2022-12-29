module.exports = {
    verbose: true,
    //setupFilesAfterEnv: ["<rootDir>/lib/test/jest.setup.js"],
    testEnvironment: "node",
    roots: ["<rootDir>"],
    testMatch: ["<rootDir>/**/?(*.)+(spec|test).+(ts|tsx|js)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
}
