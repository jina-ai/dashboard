import React from "react";
import { Card, CardBody } from "shards-react";
import { HubImage } from "../../redux/hub/hub.types";
import styled from "@emotion/styled";
import { Tag } from "./ImageCard";

type Props = {
  image: HubImage;
};

const SectionHeading = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.headerTextColor};
`;
const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const Platform = styled(Tag)`
  background-color: ${(props) => props.theme.palette.tagPlatformBackground};
`;

export default function ImageDetails({ image }: Props) {
  let { keywords, platform, author } = image;
  let dockerCommand = image["docker-command"];
  return (
    <Card className="readme-container mb-4">
      <CardBody className="pt-0 pb-2">
        <DetailsSection>
          <SectionHeading>Tags</SectionHeading>
          <div>
            {keywords.map((keyword) => (
              <Tag data-name="hubImageTags" key={keyword}>
                {keyword}
              </Tag>
            ))}
          </div>
        </DetailsSection>
        <DetailsSection>
          <SectionHeading>Platform</SectionHeading>
          <div>
            {platform.map((p) => (
              <Platform data-name="hubImageTags" key={p}>
                {p}
              </Platform>
            ))}
          </div>
        </DetailsSection>
        <DetailsSection>
          <SectionHeading>Docker Pull Command</SectionHeading>
          <div>{dockerCommand}</div>
        </DetailsSection>
        <DetailsSection>
          <SectionHeading>Owner</SectionHeading>
          <div>{author}</div>
        </DetailsSection>
      </CardBody>
    </Card>
  );
}
