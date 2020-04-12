import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
  const classes = classNames(
    className,
    "text-center",
    "text-md-left",
    "mb-sm-0"
  );

  return (
    <Col xs="12" sm="4" className={classes} { ...attrs }>
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h3 className="page-title">{title}</h3>
    </Col>
  )
};

export default PageTitle;
