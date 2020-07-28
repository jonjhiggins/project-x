import * as React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Question from "./Question";
import Error from "./Error";
import Start from "./Start";

import Result from "./Result";
import categories from "~data/categories";
import { QuestionItem, UpdateQuestion } from "~types";
import Page from "./Page";
import colours from "~data/colours";
import { AnimatePresence } from "framer-motion";

type QuestionState = QuestionItem[];

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const colourSpace = colours.length / categories.length;
const selectedColours = categories.map(
  (_, index) => colours[Math.floor(colourSpace * index)]
);
shuffleArray(selectedColours);

export function IconDisprove() {
  return (
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
  );
}

export function IconApprove() {
  return (
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
  );
}

export default function App() {
  const debug = false;
  const history = useHistory();
  const [questionsState, setQuestionsState] = React.useState<QuestionState>([
    ...categories,
  ]);

  const [currentQuestionIndex, updateCurrentQuestionIndex] = React.useState<
    number
  >(0);

  const updateQuestion: UpdateQuestion = (
    questionId: string,
    approve: boolean
  ) => {
    const newState = [...questionsState];
    newState.find(({ id }) => id === questionId).approve = approve;
    setQuestionsState(newState);
    if (currentQuestionIndex >= questionsState.length - 1) {
      history.push("/result");
      return;
    }
    updateCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function reset() {
    history.push("/");
    setQuestionsState([...categories]);
    updateCurrentQuestionIndex(0);
  }

  const Results = () => (
    <Debug>
      <tbody>
        {questionsState.map((question) => {
          const { id, name, approve } = question;
          return (
            <tr key={id}>
              <td>{name}</td>
              <ApproveCell>
                {approve !== undefined ? (approve ? "✅" : "❌") : " "}
              </ApproveCell>
            </tr>
          );
        })}
      </tbody>
    </Debug>
  );

  return (
    <div>
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/questions">
            <Page heading="">
              <Content>
                <Questions>
                  <QuestionsInner>
                    {questionsState.map((question, index) => (
                      <Question
                        active={index === currentQuestionIndex}
                        hide={currentQuestionIndex > index}
                        key={question.id}
                        index={index - currentQuestionIndex}
                        question={question}
                        updateQuestion={updateQuestion}
                        colour={selectedColours[index]}
                        zIndex={questionsState.length - index}
                      />
                    ))}
                  </QuestionsInner>
                </Questions>
                <Button
                  type="button"
                  onClick={() =>
                    updateQuestion(
                      questionsState[currentQuestionIndex].id,
                      false
                    )
                  }
                >
                  <IconDisprove />
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    updateQuestion(
                      questionsState[currentQuestionIndex].id,
                      true
                    )
                  }
                >
                  <IconApprove />
                </Button>
              </Content>
            </Page>

            {debug ? <Results /> : null}
          </Route>
          <Route path="/result">
            <Result reset={reset}>
              <Results />
            </Result>
          </Route>
          <Route match="*" type={404}>
            <Error type="404" />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
html { 
  font-size: 10px;
}
  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: 'Jost', sans-serif;
  }
`;

const Debug = styled("table")`
  margin: 1.6rem auto;
  border: 1px solid;
  padding: 1.6rem;
`;

const ApproveCell = styled("td")`
  width: 3rem;
  height: 3rem;
  text-align: right;
`;

const Questions = styled.div`
  display: block;
  min-width: 27.2rem;
  max-width: 32rem;
  margin: 0 auto;
`;

const QuestionsInner = styled.div`
  padding-top: 75%;
  position: relative;
  & > * {
    position: absolute;
    top: 0;
  }
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
