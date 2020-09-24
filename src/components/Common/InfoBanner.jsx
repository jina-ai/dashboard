import React from "react";

export default function InfoBanner({ data }) {
  return data ? (
    <div className="mr-4">
      <div className={`mb-0 banner px-4 banner-${data.theme}`}>
        {data.message}
      </div>
    </div>
  ) : (
    ""
  );
}
