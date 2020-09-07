import React from "react";
import lunr from "lunr";

function useLunrIndex<T extends { [key: string]: any }, K extends keyof T>({
  documents,
  fields,
}: {
  documents: T[];
  readonly fields: K[];
}) {
  const indexRef = React.useRef<any>();
  React.useEffect(() => {
    indexRef.current = lunr(function () {
      fields.forEach((fieldName) => this.field(fieldName as string));
      this.ref("idx");

      documents.forEach((doc) => {
        (this as any).add(doc);
      }, this);
    });
  }, [documents, fields, documents.length]);
  return indexRef.current;
}

export { useLunrIndex };
