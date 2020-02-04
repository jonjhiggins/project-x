import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import leftArrow from "~img/left-arrow.svg";
import rightArrow from "~img/right-arrow.svg";

interface Props {
  pageNumber: number;
  firstPage: number;
  lastPage: number;
}

export default function Nav({ pageNumber, firstPage, lastPage }: Props) {
  const history = useHistory();

  function handleNavigation(pageNumber: number): void {
    const url = pageNumber > lastPage ? `/result` : `/question/${pageNumber}`;
    history.push(url);
  }
  return (
    <NavStyled>
      <Button
        type="button"
        onClick={() => handleNavigation(pageNumber - 1)}
        disabled={pageNumber === firstPage}
      >
        <img src={leftArrow} alt="Left arrow" />
      </Button>
      <Button type="button" onClick={() => handleNavigation(pageNumber + 1)}>
        <img src={rightArrow} alt="Right arrow" />
      </Button>
    </NavStyled>
  );
}

const Button = styled("button")`
  border: 0;
  padding: 0;
  margin: 0;
  transition: opacity 400ms ease-out;
  background: none;

  &[disabled] {
    opacity: 0.5;
  }
`;

const NavStyled = styled("nav")`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
