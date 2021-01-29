import React from "react";
import styled from "@emotion/styled";
import Play from "../../assets/icons/Play.svg";
import Save from "../../assets/icons/Save.svg";
import Stop from "../../assets/icons/Stop.svg";
import Upload from "../../assets/icons/Upload.svg";
import Yaml from "../../assets/icons/Yaml.svg";

type Props = {
  importChart: () => void;
  copyChart: () => void;
  exportImage: (format: string) => void;
  startFlow:()=>void;
  stopFlow:()=>void;
};

const ButtonGroup = styled.div`
  height: 3.125rem;
  background: #009999;
  border-radius: 8px;
  display: flex;
`;

const Button = styled.button`
  background: #009999;
  border: 0;
  margin-right: 1rem;
`;

const PlayButton = styled.button`
  background: #009999;
  border: 0;
  margin: 0 2rem;
`;
export default function CommandBar({
  startFlow,
  stopFlow,
  importChart,
  copyChart,
  exportImage,
}: Props) {
  return (
    <div className="command-bar-container">
      <div className="command-bar">
        <ButtonGroup>
          <PlayButton onClick={startFlow}>
            <img alt="Play" src={Play} />
          </PlayButton>
          <Button onClick={stopFlow}>
            <img alt="Stop" src={Stop} />
          </Button>
          <Button onClick={() => exportImage("png")}>
            <img alt="Save" src={Save} />
          </Button>
          <Button onClick={importChart}>
            <img alt="Upload" src={Upload} />
          </Button>
          <Button onClick={copyChart}>
            <img alt="Yaml" src={Yaml} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
