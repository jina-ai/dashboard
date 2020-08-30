import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";

export default (props) => {
  const { buildHistory } = props.image;
  return (
    <Card className="readme-container mb-4">
      <CardHeader className="border-bottom d-flex flex-row">
        <h6 className="m-0 d-inline-block">Build History</h6>
      </CardHeader>
      <CardBody className="p-0 build-history">
        {buildHistory &&
          buildHistory.map((build, idx) => {
            const formattedCreated = new Date(build.created).toLocaleString();
            const buildSize = parseFloat(build.size / 1e6).toFixed(2);
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
};
