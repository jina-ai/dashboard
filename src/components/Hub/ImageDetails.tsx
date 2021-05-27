import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { HubImage } from "../../redux/hub/hub.types"
import styled from "@emotion/styled"
import { Tag } from "./ImageCard"
import CodeSnippetWithCopy from "./CodeSnippetWithCopy"

type Props = {
  image: HubImage
}

export const DetailCard = styled(Card)`
  margin-bottom: 0.75rem;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  font-family: "Roboto";
  font-size: 0.9rem;
  box-shadow: unset;
  background-color: ${(props) => props.theme.palette.background.default};
`

const SectionHeading = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.action.disabled};
  margin: 0.5rem 0;
`
const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`
const Platform = styled(Tag)`
  background-color: ${(props) => props.theme.palette.secondary.light};
`

const getUsageInFlow = (dockerName: string, version: string) =>
  `
from jina.flow import Flow
f = Flow().add(uses='${dockerName}:${version}')
`
const getPythonUsage = (dockerName: string, version: string) =>
  `
!Flow
pods:
  my_pod1:
    image: "${dockerName}:${version}"
`

export default function ImageDetails({ image }: Props) {
  let { keywords, platform, author, version } = image
  let dockerCommand = image["docker-command"]
  let dockerName = image["docker-name"]
  return (
    <>
      <DetailCard>
        <CardContent>
          <DetailsSection>
            <SectionHeading>Docker Command</SectionHeading>
            <CodeSnippetWithCopy codeSnippet={dockerCommand} />
            <SectionHeading>Python Usage</SectionHeading>
            <CodeSnippetWithCopy
              codeSnippet={getPythonUsage(dockerName, version)}
            />
            <SectionHeading>In a Flow</SectionHeading>
            <CodeSnippetWithCopy
              codeSnippet={getUsageInFlow(dockerName, version)}
            />
          </DetailsSection>
        </CardContent>
      </DetailCard>
      <DetailCard>
        <CardContent>
          <DetailsSection>
            <SectionHeading>Tags</SectionHeading>
            <div>
              {keywords.map((keyword, index) => (
                <Tag data-name={`hubImageTag-${index}`} key={keyword}>
                  {keyword}
                </Tag>
              ))}
            </div>
          </DetailsSection>
          <DetailsSection>
            <SectionHeading>Platform</SectionHeading>
            <div>
              {platform.map((p, index) => (
                <Platform data-name={`hubImagePlatform-${index}`} key={p}>
                  {p}
                </Platform>
              ))}
            </div>
            <DetailsSection>
              <SectionHeading>Owner</SectionHeading>
              <div>{author}</div>
            </DetailsSection>
          </DetailsSection>
        </CardContent>
      </DetailCard>
    </>
  )
}
