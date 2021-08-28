import React from "react";
import Button from "./Button";

type Props = {
  acceptCookies: () => void;
};

function CookiesBanner({ acceptCookies }: Props) {
  return (
    <div className="cookies-banner">
      <p className="mb-2">
        We and third parties use cookies or similar technologies ("Cookies") as
        described below to collect and process personal data, such as your IP
        address or browser information. You can learn more about how this site
        uses Cookies by reading our privacy policy linked below. By clicking "I
        consent to cookies", you accept the placement and use of these Cookies
        for these purposes. You can change your mind and revisit your
        preferences at any time by accessing the “Cookie Preferences” link in
        the footer of this site.
      </p>
      <Button className="ml-auto d-block" onClick={acceptCookies}>
        I consent to cookies
      </Button>
    </div>
  );
}

export { CookiesBanner };
