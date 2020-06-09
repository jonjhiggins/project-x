import * as React from "react";
import styled from "styled-components";
import Page from "./Page";
import { QuestionItem, UpdateQuestion } from "~types";

interface Props {
  question: QuestionItem;
  updateQuestion: UpdateQuestion;
}

export default function Question({ question, updateQuestion }: Props) {
  return (
    <Page heading={question.name}>
      <>
        <Content>
          <button type="button" onClick={() => updateQuestion(false)}>
            Reject
          </button>

          <button type="button" onClick={() => updateQuestion(true)}>
            Approve
          </button>
        </Content>
      </>
    </Page>
  );
}

const Content = styled.div`
  margin-top: 24px;
`;
