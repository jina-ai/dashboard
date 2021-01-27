import React, { ReactNode } from "react";
import { Card, Row, Col } from "react-bootstrap";

type Props = {
  title: ReactNode;
  content: string;
  icon: string;
  theme: string;
  link: string;
};

function HelpCard({ title, content, icon, theme, link }: Props) {
  return (
    <a
      className="unstyled-link"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-name={`help-card-${theme}`}
    >
      <Card className="h-100">
        <Card.Body className="pt-3">
          <Row className="align-items-center">
            <Col xs="8">
              <h4>{title}</h4>
            </Col>
            <Col xs="4">
              <h1 className="float-right">
                <span className={`${icon} log-${theme}`} />
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>{content}</Col>
          </Row>
        </Card.Body>
      </Card>
    </a>
  );
}

export { HelpCard };
