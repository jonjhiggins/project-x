import * as React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Question from "./Question";
import Error from "./Error";
import Start from "./Start";
import * as R from "ramda"

import Result from "./Result";
import categories from "~data/categories";
import { QuestionItem, UpdateQuestion } from "~types";

interface QuestionState {
  [key: string]: QuestionItem;
}

export default function App() {
  const debug = false
  const history = useHistory();
  const [questionsState, setQuestionsState] = React.useState<QuestionState>(
    R.clone(categories)
  );

  const [currentQuestionIndex, updateCurrentQuestionIndex] = React.useState<
    number
  >(0);

  const updateQuestion: UpdateQuestion = (id: string, approve: boolean) => {
    const newState = Object.assign({}, questionsState);
    newState[id].approve = approve;
    setQuestionsState(newState);
    if (currentQuestionIndex >= Object.keys(questionsState).length - 1) {
      history.push("/result");
      return;
    }
    updateCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function getQuestionFromIndex(index: number): QuestionItem {
    const keys = Object.keys(questionsState);
    return questionsState[keys[index]];
  }

  function reset() {
    history.push("/");
    setQuestionsState( R.clone(categories))
    updateCurrentQuestionIndex(0)
  }

  const Results = () => (
    <Debug>
      <tbody>
        {Object.keys(questionsState).map((key) => {
          const { id, name, approve } = questionsState[key];
          return (
            <tr key={id}>
              <td>{name}</td>
              <ApproveCell>{approve !== undefined ? (approve ? "✅" : "❌") : " "}</td>
            </tr>
          );
        })}
      </tbody>
    </Debug>
  );
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Start />
        </Route>
        <Route path="/questions">
          <Question
            question={getQuestionFromIndex(currentQuestionIndex)}
            updateQuestion={updateQuestion}
          >
            {debug ? <Results /> : null }
          </Question>
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
text-align: right;`
