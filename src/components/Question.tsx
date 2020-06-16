import * as React from "react";
import styled from "styled-components";
import Page from "./Page";
import { QuestionItem, UpdateQuestion } from "~types";

interface Props {
  question: QuestionItem;
  updateQuestion: UpdateQuestion;
  children: React.ReactChild;
}

export default function Question({
  question,
  updateQuestion,
  children,
}: Props) {
  return (
    <Page heading={question.name}>
      <>
        <Content>
          <button
            type="button"
            onClick={() => updateQuestion(question.id, false)}
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => updateQuestion(question.id, true)}
          >
            Approve
          </button>
          {children}
        </Content>
      </>
    </Page>
  );
}

const Content = styled.div`
  margin-top: 24px;
`;
