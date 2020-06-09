import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Question from "./Question";
import Error from "./Error";
import Start from "./Start";

import Result from "./Result";
import categories from "~data/categories";
import { QuestionItem, UpdateQuestion } from "~types";

export default function App() {
  const [questionsState, setQuestionsState] = React.useState<QuestionItem[]>([
    ...categories.map((category) => ({
      ...category,
      approve: undefined,
    })),
  ]);
  const [currentQuestionIndex, updateCurrentQuestionIndex] = React.useState<
    number
  >(0);
  const updateQuestion: UpdateQuestion = (approve: boolean) => {
    updateCurrentQuestionIndex(currentQuestionIndex + 1); // @TODO handle max questions
  };
  return (
    <Router>
      <div>
        <GlobalStyle />
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/questions">
            <Question
              question={questionsState[currentQuestionIndex]}
              updateQuestion={updateQuestion}
            />
            <Debug
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(questionsState),
              }}
            />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
          <Route match="*" type={404}>
            <Error type="404" />
          </Route>
        </Switch>
      </div>
    </Router>
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
    font-family: 'IBM Plex Sans', sans-serif;
  }
`;

const Debug = styled("div")`
  position: fixed;
  bottom: 0;
`;
