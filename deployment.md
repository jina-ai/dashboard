## Release process

Release to production is done by merging master to release branch.

## Deployment Environments

### Production

Production version of dashboard is deployed in https://dashboard.jina.ai and https://console.jina.ai

This deployment is done from release branch

### Staging

Staging environment for dashboard is https://console-dev.jina.ai

This is deployed from master branch

## Feature Switches

We use feature switches to disable some features in some environments.
We can use .env, .env.local, .env.testing, .env.production to set different values of variables.
In .env* files, prefix feature flag variable with `REACT_APP_FEATURE`

When you add a feature flag, remember to add a `Todo` to remove it in the future.
Feature flags are a type of technical debt. It should be removed after releasing it to all instances.