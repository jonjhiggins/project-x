import * as React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactChild;
  heading: string;
}

export default function Page({ children, heading }: Props) {
  return (
    <PageStyled>
      <HeadingStyled>{heading}</HeadingStyled>
      {children || null}
    </PageStyled>
  );
}

const PageStyled = styled("div")`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.6rem;
  box-sizing: border-box;
`;

const HeadingStyled = styled("h1")`
  text-align: center;
  font-size: 3.6rem;
`;
