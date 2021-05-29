import React from "react"
import   Container  from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid"
import { FallbackProps } from "react-error-boundary"
import { PageTitle } from "../components/Common/PageTitle"
import  Button  from "@material-ui/core/Button"

function FallbackPage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Container className="main-content-container p-5">
      <Grid container className="page-header mb-4">
        <PageTitle
          title="Error"
          subtitle="This should not have happened"
          className="text-sm-left my-3"
        />
      </Grid>
      <Grid container className="page-header mb-4">
        <Grid item xs={12} sm={3}>
          <p>Something went wrong:</p>
          <pre>
            <code className="text-warning">{error!.message}</code>
          </pre>
        </Grid>
      </Grid>
      <Grid container className="page-header">
        <Grid>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export { FallbackPage }
