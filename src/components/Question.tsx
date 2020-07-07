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
  const [moving, setMoving] = React.useState(false);

  React.useEffect(() => {
    if (!pageRef.current) {
      return;
    }
    const hammertime = new Hammer.default(pageRef.current, {});
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

      setMoving(false);
    });
    hammertime.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
    return () => {
      hammertime.stop(false);
      hammertime.destroy();
    };
  }, [pageRef]);

  React.useEffect(() => {
    if (moving) {
      return;
    }
    pageRef.current.style.transform = ``;
  }, [moving]);

  return (
    <Page heading="">
      <Content>
        <Card ref={pageRef} moving={moving}>
          <CardContext>
            <CardContent>
              <Heading>{question.name}</Heading>
            </CardContent>
          </CardContext>
        </Card>
        {children}
        <Button
          type="button"
          onClick={() => updateQuestion(question.id, false)}
        >
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M45 0C20.115 0 0 20.115 0 45C0 69.885 20.115 90 45 90C69.885 90 90 69.885 90 45C90 20.115 69.885 0 45 0ZM56.655 27L45 38.655L33.345 27L27 33.345L38.655 45L27 56.655L33.345 63L45 51.345L56.655 63L63 56.655L51.345 45L63 33.345L56.655 27ZM9 45C9 64.845 25.155 81 45 81C64.845 81 81 64.845 81 45C81 25.155 64.845 9 45 9C25.155 9 9 25.155 9 45Z"
              fill="black"
              fillOpacity="0.5"
            />
          </svg>
        </Button>

        <Button type="button" onClick={() => updateQuestion(question.id, true)}>
          <svg
            width="90"
            height="83"
            viewBox="0 0 90 83"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M45 9.405C49.905 3.645 57.42 0 65.25 0C79.11 0 90 10.89 90 24.75C90 41.746 74.7251 55.5972 51.5821 76.5833L51.525 76.635L45 82.575L38.475 76.68L38.2974 76.5186C15.2219 55.5491 0 41.7165 0 24.75C0 10.89 10.89 0 24.75 0C32.58 0 40.095 3.645 45 9.405ZM45 70.425L45.45 69.975C66.87 50.58 81 37.755 81 24.75C81 15.75 74.25 8.99999 65.25 8.99999C58.32 8.99999 51.57 13.455 49.23 19.62H40.815C38.43 13.455 31.68 8.99999 24.75 8.99999C15.75 8.99999 9 15.75 9 24.75C9 37.755 23.13 50.58 44.55 69.975L45 70.425Z"
              fill="black"
              fillOpacity="0.5"
            />
          </svg>
        </Button>
      </Content>
    </Page>
  );
}

const Heading = styled.h1`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

const Card = styled.div<{ moving: boolean }>`
  margin: 0 auto;
  border-radius: 2.4rem;
  min-width: 27.2rem;
  max-width: 32rem;
  position: relative;
  transition: ${({ moving }) =>
    moving ? undefined : "transform 400ms ease-out"};
`;

const CardContext = styled.div`
  padding-top: 56.25%;
`;

const CardContent = styled.div`
  background-color: #e0bdb5;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 2.4rem;
`;

const Button = styled.button`
  border: 0;
  background: none;
  padding: 1.8rem;
  margin: 0 0.6rem;
  cursor: pointer;
  outline: none;

  & svg {
    height: 3.6rem;
    width: 3.6rem;
    display: block;
    transition: transform 200ms ease-out;
  }

  &:hover svg {
    transform: scale(1.2);
    path {
      fill-opacity: 0.6;
    }
  }
`;
