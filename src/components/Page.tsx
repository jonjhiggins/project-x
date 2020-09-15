import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  children?: React.ReactChild;
  heading?: string;
  style?: { backgroundColor: string };
}

export default function Page({ children, heading, style }: Props) {
  return (
    <PageStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={style}
    >
      {heading ? <HeadingStyled>{heading}</HeadingStyled> : null}
      <Content>{children || null}</Content>
    </PageStyled>
  );
}

const PageStyled = styled(motion.div)`
  height: 100vh;
  display: flex;
  padding: 1.6rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Content = styled("div")`
  text-align: center;
  width: 100%;
  flex: 1 0 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeadingStyled = styled("h1")`
  text-align: center;
  font-size: 3.6rem;
  margin: 0;
`;
