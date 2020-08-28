import React from "react";
import { Card, Row, Col } from "react-bootstrap";

class HelpCard extends React.Component {
  render = () => {
    const { title, content, icon, theme, link } = this.props;
    return (
      <a className="unstyled-link" href={link}>
        <Card className="h-100">
          <Card.Body className="pt-3">
            <Row>
              <Col xs="8" className="pr-0">
                <h4>{title}</h4>
                {content}
              </Col>
              <Col xs="4" className="pl-0">
                <h1 className="mt-4 ml-4">
                  <span className={`${icon} log-${theme}`} />
                </h1>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </a>
    );
  };
}

export default HelpCard;
