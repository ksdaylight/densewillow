const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './packages/frontend',
});
const config = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    preset: '../../jest.preset.js',
    displayName: 'frontend',
    transform: {
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/packages/frontend',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);

// export default {
//     displayName: 'frontend',
//     preset: '../../jest.preset.js',
//     transform: {
//         '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
//         '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
//     },
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//     coverageDirectory: '../../coverage/packages/frontend',
// };
