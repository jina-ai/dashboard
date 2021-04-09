type StringMap = { [key: string]: any };

export const getFeatureFlags = (environmentVariables: StringMap) => {
    return Object.fromEntries(
        Object.entries(environmentVariables)
        .filter(variableEntry => variableEntry[0].startsWith("REACT_APP_FEATURE"))
        .map(variableEntry => [variableEntry[0].replace('REACT_APP_FEATURE_', ""), (variableEntry[1] === "enabled")])
        )
}

export const isFeatureEnabled = (feature: string) : boolean => {
    // Usage: To enable a feature flag, add a variable in .env* files (depending on environment)
    // with prefix 'REACT_APP_FEATURE_'
    // When checking if the feature is enabled, call isFeatureEnabled with feature name as parameter
    // without prefix 'REACT_APP_FEATURE_'
    const environmentVariables = process.env
    const featureFlags = getFeatureFlags(environmentVariables)
    return Boolean(featureFlags[feature])
}