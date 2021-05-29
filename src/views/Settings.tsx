import React from "react";
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { PageTitle } from "../components/Common/PageTitle";
import SettingsCard from "../components/Settings/Settings";

class SettingsView extends React.Component {
  render = () => {
    return (
      <Container className="main-content-container px-4">
        <Grid container className="page-header mb-4">
          <PageTitle
            title="Settings"
            className="text-sm-left mb-3"
          />
        </Grid>
        <SettingsCard />
      </Container>
    );
  };
}

export default SettingsView;
