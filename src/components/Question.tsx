import * as React from "react";
import * as Hammer from "hammerjs";
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
  const pageRef = React.useRef(null);

  React.useEffect(() => {
    if (!pageRef.current) {
      return;
    }
    const hammertime = new Hammer.default(pageRef.current, {});
    hammertime.on("pan", function(e) {
      pageRef.current.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px)`;
    });
    hammertime.on("panend", function(e) {
      pageRef.current.style.transform = ``;
    });
    hammertime.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
    console.log(pageRef.current);
    return () => {
      hammertime.stop(false);
      hammertime.destroy();
    };
  }, [pageRef]);

  return (
    <Page heading="">
      <Content>
        <PageInner ref={pageRef}>
          <Heading>{question.name}</Heading>
        </PageInner>
        {children}
        <button
          type="button"
          onClick={() => updateQuestion(question.id, false)}
        >
          Reject
        </button>

        <button type="button" onClick={() => updateQuestion(question.id, true)}>
          Approve
        </button>
      </Content>
    </Page>
  );
}

const Heading = styled.h1``;

const PageInner = styled.div`
  background: red;
  max-width: 40rem;
  align-content: center;
  justify-content: center;
  display: flex;
  height: 10rem;
  margin: 0 auto;
`;

const Content = styled.div`
  margin-top: 24px;
`;
