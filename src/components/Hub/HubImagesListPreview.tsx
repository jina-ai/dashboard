import React from "react";
import ImageCard from "./ImageCard";
import styled from "@emotion/styled";

const SubTitle = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
`;

const HubImagesListPreview = () => {
  // Todo: update images after fetching it from hub API
  const images = [
    {
      name: "Dummy MWU Encoder",
      author: "dev-team@jina.ai",
      description: "a minimum working unit of a containerized encoder",
      keywords: ["Search", "encode"],
      version: "0.0.1",
      "jina-version": "0.10.1",
    },
    {
      name: "Dummy MWU Encoder",
      author: "dev-team@jina.ai",
      description: "a minimum working unit of a containerized encoder",
      keywords: ["Search", "encode"],
      version: "0.0.2",
      "jina-version": "0.10.1",
    },
  ];

  return (
    <>
      <SubTitle data-name="hubImagesPreviewSubtitle">Latest</SubTitle>
      {images.map((image) => (
        <ImageCard
          image={image}
          key={`${image.name}.${image.version}.${image["jina-version"]}`}
        />
      ))}
    </>
  );
};

export default HubImagesListPreview;
