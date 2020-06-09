import * as React from "react";
import Page from "./Page";

const errorText = {
  "404": "Sorry, page not found",
};

interface Props {
  type: string;
}

export default function Error({ type }: Props) {
  return <Page heading={errorText[type]} />;
}
