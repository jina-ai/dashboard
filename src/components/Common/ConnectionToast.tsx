import React from "react";
import Button from "./Button";

type Props = {
  reconnect: () => void;
};

function ConnectionToast({ reconnect }: Props) {
  return (
    <div
      className="notifications-container"
      data-name="connection-notification-offline"
    >
      <div className="bg-warning">
        <div className="bg-warning text-white">
          <strong className="mr-auto">
            <i className="material-icons mr-1">warning</i>Could not connect to
            Jina instance
          </strong>
        </div>
        <div className="text-white">
          <div>
            <div className="pr-2">
              <a
                href="https://github.com/jina-ai/dashboard#getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2"
              >
                <Button variant="outlined" className="w-100">
                  <i className="material-icons mr-1">text_snippet</i>View Docs
                </Button>
              </a>
            </div>
            <div className="pl-2">
              <Button variant="primary" className="w-100" onClick={reconnect}>
                <i className="material-icons mr-1">refresh</i>Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ConnectionToast };
