import * as React from "react";
import Nav from "./Nav";
import Page from "./Page";

interface Props {
  id: number;
}

const FIRST_PAGE = 1;
const LAST_PAGE = 3;

export default function Question({ id }: Props) {
  return (
    <Page heading={`Question ${id}`}>
      <Nav pageNumber={id} firstPage={FIRST_PAGE} lastPage={LAST_PAGE} />
    </Page>
  );
}
