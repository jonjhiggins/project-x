import * as React from "react";
import Page from "./Page";

export default function Result({
  children,
  reset,
}: {
  children: React.ReactChild;
  reset: () => void;
}) {
  return (
    <Page heading="Result">
      <div>
        <button type="button" onClick={reset}>
          Try again
        </button>
        {children}
      </div>
    </Page>
  );
}
