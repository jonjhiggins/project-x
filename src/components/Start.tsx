import * as React from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

export default function Start() {
  return (
    <Page heading="Start">
      <Link to="/questions">Go</Link>
    </Page>
  );
}
