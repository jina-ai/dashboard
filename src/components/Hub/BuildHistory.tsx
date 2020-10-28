import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";

type Build = {
  created: string;
  size: number;
  os: string;
  architecture: string;
};

type Props = {
  image: {
    buildHistory?: Build[];
    [key: string]: any;
  };
};

export default function BuildHistory({ image }: Props) {
  const { buildHistory } = image;
  return (
    <Card className="readme-container mb-4">
      <CardHeader className="border-bottom d-flex flex-row">
        <h6 className="m-0 d-inline-block">Build History</h6>
      </CardHeader>
      <CardBody className="p-0 build-history">
        {buildHistory &&
          buildHistory.map((build, idx) => {
            const formattedCreated = new Date(build.created).toLocaleString();
            const buildSize = (build.size / 1e6).toFixed(2);
            return (
              <div key={idx} className="user-activity__item pr-3 py-3">
                <div className="user-activity__item__icon mt-2">
                  <i className="material-icons">build</i>
                </div>
                <div className="user-activity__item__content">
                  <span className="text-light">{formattedCreated}</span>
                  <p>
                    [{build.os}/{build.architecture}] {buildSize} MB
                  </p>
                </div>
              </div>
            );
          })}
      </CardBody>
    </Card>
  );
}
