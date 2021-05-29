import React from "react"
import GridLayout from "react-grid-layout"
import styled from "@emotion/styled"
import  Card from "@material-ui/core/Card"
import { HelpCard } from "../components/Common/HelpCard"
import HubImagesList from "../components/Hub/HubImagesList"
import SettingsCard from "../components/Settings/Settings"
import { LogsView } from "./LogsView"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const GridItem = styled(Card)`
  overflow-y: hidden;
  overflow-x: hidden;
`

const HomeView = () => {
  console.log(process.env)
  const layout = [
    { i: "a", x: 0, y: 0, w: 4, h: 4 },
    { i: "b", x: 1, y: 0, w: 8, h: 10 },
    { i: "c", x: 4, y: 0, w: 3, h: 4 },
    { i: "d", x: 0, y: 1, w: 8, h: 6 },
  ]
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      <GridItem key="a">
        <SettingsCard />
      </GridItem>
      <GridItem key="b">
        <HubImagesList />
      </GridItem>
      <GridItem key="c">
        <HelpCard
          title="Jina Docs"
          content="The best way to learn Jina in depth."
          link="https://docs.jina.ai"
          icon="fas fa-book"
          theme="primary"
          dataName="jina-docs-card"
        />
      </GridItem>
      <GridItem key="d">
        <LogsView />
      </GridItem>
    </GridLayout>
  )
}

export default HomeView
