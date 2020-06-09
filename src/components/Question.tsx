import * as React from "react";
import styled from "styled-components";
import Page from "./Page";

const questions = [
  {
    heading: "Which genres do you like?",
    answers: [
      { name: "Fiction", id: "fiction" },
      { name: "Non-fiction", id: "non-fiction" },
      { name: "Romance", id: "romance" },
      { name: "Humour", id: "humour" },
      { name: "Science fiction", id: "science-fiction" },
      { name: "Fantasy", id: "fantasy" },
      { name: "Mystery and thriller", id: "mystery-and-thriller" },
      { name: "Historial fiction", id: "historical-fiction" },
    ],
  },
  {
    heading: "Modern or classic books?",
    answers: [
      { name: "Modern", id: "modern" },
      { name: "Classic", id: "classic" },
    ],
  },
  {
    heading: "Short or long read?",
    answers: [
      { name: "Short", id: "short" },
      { name: "Long", id: "long" },
    ],
  },
];

export default function Question() {
  return (
    <Page heading={`Question`}>
      <>
        <Questions></Questions>
      </>
    </Page>
  );
}

const Questions = styled("div")``;
