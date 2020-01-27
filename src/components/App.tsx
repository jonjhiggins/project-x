import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import styled from "styled-components";
import Question from "./Question";
import leftArrow from "~img/left-arrow.svg";
import rightArrow from "~img/right-arrow.svg";

export default function App() {
  const [pageNumber, setPageNumber] = React.useState(1);

  function handleNavigation(nextPage) {
    setPageNumber(nextPage);
    // history.push(`/question-${pageNumber}`);
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route
            path="/question/:id"
            render={() => <Question heading={`${pageNumber}`} />}
          />
        </Switch>

        <nav>
          <Button
            type="button"
            onClick={() => handleNavigation(pageNumber - 1)}
          >
            <img src={leftArrow} alt="Left arrow" />
          </Button>
          <Button
            type="button"
            onClick={() => handleNavigation(pageNumber + 1)}
          >
            <img src={rightArrow} alt="Right arrow" />
          </Button>
        </nav>
      </div>
    </Router>
  );
}

const Button = styled("button")`
  border: 0;
  padding: 0;
  margin: 0;
`;
