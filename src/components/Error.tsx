import * as React from "react";

const errorText = {
  "404": "Sorry, page not found"
};

interface Props {
  type: string;
}

export default function Error({ type }: Props) {
  return <h1>{errorText[type]}</h1>;
}
