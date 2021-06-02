import React, { ReactNode } from "react"
import { CardWithOutline } from "./Card"
import Grid from "@material-ui/core/Grid"

type Props = {
  title: ReactNode
  content: string
  icon: string
  theme: string
  link: string
  dataName: string
}

function HelpCard({ title, content, icon, theme, link, dataName }: Props) {
  return (
    <a
      className="unstyled-link"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-name={dataName}
    >
      <CardWithOutline>
        <Grid container>
          <Grid container item className="align-items-center">
            <Grid item xs={8}>
              <h4>{title}</h4>
            </Grid>
            <Grid item xs={4}>
              <h1 className="float-right">
                <span className={`${icon} log-${theme}`} />
              </h1>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item>{content}</Grid>
          </Grid>
        </Grid>
      </CardWithOutline>
    </a>
  )
}

export { HelpCard }
