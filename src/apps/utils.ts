import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

export function initSentry() {
  if (process.env.NODE_ENV === "production") {
    Sentry.init({
      dsn:
        "https://085edd94ec3e479cb20f2c65f7b8cb82@o525420.ingest.sentry.io/5639443",
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  }
}
