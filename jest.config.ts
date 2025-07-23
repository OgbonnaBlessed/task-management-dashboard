import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/_mocks_/fileMock.ts",
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: "<rootDir>/src/",
        }),
    }
}