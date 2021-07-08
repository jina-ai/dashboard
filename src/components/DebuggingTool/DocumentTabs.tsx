import styled from "@emotion/styled"
import { Tab, Tabs } from "@material-ui/core"
import React from "react"
import { useTheme } from "@emotion/react"
import { DebugResponse } from "../../views/DebuggingTool"
import { NodeMediaPreview } from "./FlowChartNodes"

const TabText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  width: 100%;
`

const MediaOverlay = styled.div`
  position: absolute;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
`
type TabProps = {
  docs: DebugResponse["data"]["docs"]
  docIndex: number
  height: number
  setDocIndex: (newIndex: number) => void
}

type DocumentLabelProps = {
  text?: string
  uri?: string
  idx: number
  selectedIndex: number
}

const DocumentTabLabel = ({
  text,
  uri,
  idx,
  selectedIndex,
}: DocumentLabelProps) => {
  return (
    <>
      {text && <TabText>"{text}"</TabText>}
      {uri && (
        <>
          <NodeMediaPreview uri={uri} />
          {selectedIndex !== idx && <MediaOverlay />}
        </>
      )}
    </>
  )
}

export const DocumentTabs = ({
  docs,
  docIndex,
  height,
  setDocIndex,
}: TabProps) => {
  const { palette } = useTheme()
  return (
    <Tabs
      style={{ height, width: "12em" }}
      orientation="vertical"
      variant="scrollable"
      value={docIndex}
      onChange={(e, newIndex) => setDocIndex(newIndex)}
      scrollButtons="auto"
    >
      {docs.map(({ text, uri }, idx) => {
        return (
          <Tab
            style={{ borderBottom: `1px solid ${palette.grey[300]}` }}
            label={
              <DocumentTabLabel
                text={text}
                uri={uri}
                idx={idx}
                selectedIndex={docIndex}
              />
            }
            value={idx}
            key={idx}
          />
        )
      })}
    </Tabs>
  )
}
