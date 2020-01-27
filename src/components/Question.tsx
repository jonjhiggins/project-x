import * as React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  heading: string;
}

export default function Question({ heading }: Props) {
  const history = useHistory();
  console.log(history);
  return <h1>{heading}</h1>;
}
