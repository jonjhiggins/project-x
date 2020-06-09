import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Question from "./Question";
import Error from "./Error";
import Start from "./Start";

import Result from "./Result";

export default function App() {
  return (
    <Router>
      <div>
        <GlobalStyle />
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/questions">
            <Question />
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
