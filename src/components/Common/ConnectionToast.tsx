import React from "react";
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import SnackBar from "@material-ui/core/Snackbar"

type Props = {
  reconnect: () => void;
};

function ConnectionToast({ reconnect }: Props) {
  return (
    <div
      className="notifications-container"
      data-name="connection-notification-offline"
    >
      <SnackBar className="bg-warning">
        <>
        <div className="bg-warning text-white">
          <strong className="mr-auto">
            <i className="material-icons mr-1">warning</i>Could not connect to
            Jina instance
          </strong>
        </div>
        <div className="text-white">
          <Grid container>
            <Grid xs={6} className="pr-2">
              <a
                href="https://github.com/jina-ai/dashboard#getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <Button>
                  <i className="material-icons mr-1">text_snippet</i>View Docs
                </Button>
              </a>
            </Grid>
            <Grid xs={6} className="pl-2">
              <Button onClick={reconnect}>
                <i className="material-icons mr-1">refresh</i>Refresh
              </Button>
            </Grid>
          </Grid>
        </div>
        </>
      </SnackBar>
    </div>
  );
}

export { ConnectionToast };
