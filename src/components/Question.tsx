import * as React from "react";
import * as Hammer from "hammerjs";
import styled from "styled-components";
import Page from "./Page";
import { QuestionItem, UpdateQuestion } from "~types";

interface Props {
  question: QuestionItem;
  updateQuestion: UpdateQuestion;
  index: number;
  zIndex: number;
  colour: string;
  active: boolean;
  hide: boolean;
}

export default function Question({
  question,
  updateQuestion,
  index,
  zIndex,
  colour,
  active,
  hide,
}: Props) {
  const pageRef = React.useRef(null);
  const [moving, setMoving] = React.useState(false);
  let hammertime = null;

  React.useEffect(() => {
    if (!pageRef.current || !active) {
      return;
    }
    hammertime = new Hammer.default(pageRef.current, {});
    hammertime.on("pan", function(e) {
      if (!moving) {
        setMoving(true);
      }
      const xMulti = e.deltaX * 0.03;
      const yMulti = e.deltaY / 80;
      const rotate = xMulti * yMulti;
      pageRef.current.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px) rotate(${rotate}deg)`;
    });
    hammertime.on("panend", function(e) {
      updateQuestion(question.id, e.deltaX > 0);
      if (!moving) {
        return;
      }
      setMoving(false);
    });
    hammertime.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
    return () => {
      if (!hammertime) {
        return;
      }
      console.log(hammertime);
      hammertime.stop(false);
      hammertime.destroy();
    };
  }, [pageRef, active]);

  React.useEffect(() => {
    if (moving || !pageRef.current) {
      return;
    }
    pageRef.current.style.transform = ``;
  }, [moving, active]);
  return hide ? null : (
    <Card ref={pageRef} moving={moving} zIndex={zIndex}>
      <CardContext index={index}>
        <CardContent colour={colour} index={index}>
          <Heading>{question.name}</Heading>
        </CardContent>
      </CardContext>
    </Card>
  );
}

const Heading = styled.h1`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

const Card = styled.div<{ moving: boolean; zIndex: number }>`
  margin: 0 auto;
  border-radius: 2.4rem;
  position: relative;
  height: 100%;
  width: 100%;
  transition: ${({ moving }) =>
    moving ? undefined : "transform 400ms ease-out"};
  z-index: ${({ zIndex }) => zIndex};
`;

const CardContext = styled.div<{ index: number }>`
  transform-origin: top;
  transform: ${({ index }) =>
    `translate(0, -${index * 5}px) scale(${(10 - index) / 10})`};
  background: #fff;
  height: 100%;
  border-radius: 2.4rem;
`;

const CardContent = styled.div<{ colour: string; index: number }>`
  background-color: ${({ colour }) => colour};
  opacity: ${({ index }) => (10 - index) / 10};
  border-radius: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
