import React from "react";
import Grid from "@material-ui/core/Grid";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

function PageTitle({ title, subtitle, className }: Props) {
  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <h3 className="page-title" data-name="title">
          {title}
        </h3>
        <p className="page-subtitle mt-2 mb-0">{subtitle}</p>
      </Grid>
    </Grid>
  );
}

export { PageTitle };
