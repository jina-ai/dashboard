import styled from "@emotion/styled"
import { Tab, Tabs } from "@material-ui/core"
import React from "react"
import { useTheme } from "@emotion/react"
import { DebugResponse } from "../../views/DebuggingTool"
import { NodeMediaPreview } from "./FlowChartNodes"

type TabProps = {
  docs: DebugResponse["data"]["docs"]
  docIndex: number
  height: number
  setDocIndex: (newIndex: number) => void
}

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

export const DocumentTabs = ({
  docs,
  docIndex,
  height,
  setDocIndex,
}: TabProps) => {
  const { palette } = useTheme()

  const TabItem = styled(Tab)`
    border-bottom: 1px solid ${palette.grey[300]};
  `

  const TabsContainer = styled(Tabs)`
    height: ${height};
    width: 12em;
  `

  return (
    <TabsContainer
      orientation="vertical"
      variant="scrollable"
      value={docIndex}
      onChange={(e, newIndex) => setDocIndex(newIndex)}
      scrollButtons="auto"
    >
      {docs.map(({ text, uri }, idx) => {
        const ele = (
          <>
            {text && <TabText>"{text}"</TabText>}
            {uri && (
              <>
                <NodeMediaPreview uri={uri} />
                {docIndex !== idx && <MediaOverlay />}
              </>
            )}
          </>
        )

        return <TabItem label={ele} value={idx} key={idx} />
      })}
    </TabsContainer>
  )
}
