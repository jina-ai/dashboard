import {getFeatureFlags, isFeatureEnabled} from "../featureSwitch"

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules() 
  process.env = { ...OLD_ENV, REACT_APP_FEATURE_TELEPORTATION: "enabled", REACT_APP_FEATURE_TIME_TRAVEL: "disabled" }
});

afterAll(() => {
  process.env = OLD_ENV
});

describe("feature flags", () => {
    it("returns feature flags in environment variables", () => {
        expect(getFeatureFlags({a: 1, REACT_APP_FEATURE_ROCKET_LAUNCH: "enabled"}))
        .toEqual({ROCKET_LAUNCH: true})
    })
    it("returns feature flags in environment variables", () => {
        expect(getFeatureFlags({a: 1, REACT_APP_FEATURE_ROCKET_LAUNCH: undefined}))
        .toEqual({ROCKET_LAUNCH: false})
    })

    it("checks if a feature is enabled", () => {
        expect(isFeatureEnabled("TELEPORTATION")).toEqual(true)
        expect(isFeatureEnabled("TIME_TRAVEL")).toEqual(false)
    })

    it("returns false when feature is not declared in enviroment variables", () => {
        expect(isFeatureEnabled("MIND_UPLOAD")).toEqual(false)
    })
})