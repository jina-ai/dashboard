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
      id: "uudi1",
      author: "dev-team@jina.ai",
      description: "a minimum working unit of a containerized encoder",
      tags: ["Search", "encode"],
    },
    {
      name: "Dummy MWU Encoder",
      id: "uudi2",
      author: "dev-team@jina.ai",
      description: "a minimum working unit of a containerized encoder",
      tags: ["Search", "encode"],
    },
  ];

  return (
    <>
      <SubTitle>Latest</SubTitle>
      {images.map((image) => (
        <ImageCard image={image} key={image.id} />
      ))}
    </>
  );
};

export default HubImagesListPreview;
