import React from "react";

type Props = {
  data: {
    theme: string;
    message: string;
  };
};

function InfoBanner({ data }: Props) {
  if (!data) return null;
  return (
    <div className="mr-4">
      <div className={`mb-0 banner px-4 banner-${data.theme}`}>
        {data.message}
      </div>
    </div>
  );
}

export { InfoBanner };
