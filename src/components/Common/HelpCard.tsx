import React, { ReactNode } from "react";

type Props = {
  title: ReactNode;
  content: string;
  icon: string;
  theme: string;
  link: string;
  dataName: string;
};

function HelpCard({ title, content, icon, theme, link, dataName }: Props) {
  return (
    <a
      className="unstyled-link"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-name={dataName}
    >
      <div className="h-100">
        <div className="pt-3">
          <div className="align-items-center">
            <div>
              <h4>{title}</h4>
            </div>
            <div>
              <h1 className="float-right">
                <span className={`${icon} log-${theme}`} />
              </h1>
            </div>
          </div>
          <div>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </a>
  );
}

export { HelpCard };
