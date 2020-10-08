import React from "react";
import classNames from "classnames";
import { Col } from "react-bootstrap";

type Props = {
  title: string;
  subtitle: string;
  className: string;
};

function PageTitle({ title, subtitle, className }: Props) {
  const classes = classNames(
    className,
    "text-center",
    "text-md-left",
    "mb-sm-0"
  );

  return (
    <Col xs="12" sm="3" className={classes}>
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h3 className="page-title">{title}</h3>
    </Col>
  );
}

export { PageTitle };
