import * as React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactChild;
  heading?: string;
}

export default function Page({ children, heading }: Props) {
  return (
    <PageStyled>
      {heading ? <HeadingStyled>{heading}</HeadingStyled> : null}
      <Content>{children || null}</Content>
    </PageStyled>
  );
}

const PageStyled = styled("div")`
  height: 100vh;
  display: flex;
  padding: 1.6rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled("div")`
  text-align: center;
  width: 100%;
`;

const HeadingStyled = styled("h1")`
  text-align: center;
  font-size: 3.6rem;
  margin: 0;
`;
