import React from "react"
import { Toast, Button, Row, Col } from "react-bootstrap"

type Props = {
  reconnect: () => void
}

function ConnectionToast({ reconnect }: Props) {
  return (
    <div
      className="notifications-container"
      data-name="connection-notification-offline"
    >
      <Toast className="bg-warning">
        <Toast.Header className="bg-warning text-white" closeButton={false}>
          <strong className="mr-auto">
            <i className="material-icons mr-1">warning</i>Could not connect to
            Jina instance
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          <Row>
            <Col xs="6" className="pr-2">
              <a
                href="https://github.com/jina-ai/dashboard#getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <Button variant="light" className="w-100">
                  <i className="material-icons mr-1">text_snippet</i>View Docs
                </Button>
              </a>
            </Col>
            <Col xs="6" className="pl-2">
              <Button variant="primary" className="w-100" onClick={reconnect}>
                <i className="material-icons mr-1">refresh</i>Refresh
              </Button>
            </Col>
          </Row>
        </Toast.Body>
      </Toast>
    </div>
  )
}

export { ConnectionToast }
