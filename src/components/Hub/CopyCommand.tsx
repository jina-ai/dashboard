import React from "react";
import { Card, CardBody } from "shards-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { HubImage } from "../../redux/hub/hub.types";

type Props = {
  image: HubImage;
  copyCode: (code: string) => void;
};

export default function CopyCommand({ image, copyCode }: Props) {
  return (
    <Card className="mb-4">
      <CardBody className="py-2 px-3 pt-4 code-usage">
        <SyntaxHighlighter
          language="bash"
          style={atomOneLight}
          onClick={() => copyCode("image")}
        >
          image
        </SyntaxHighlighter>
      </CardBody>
    </Card>
  );
}
