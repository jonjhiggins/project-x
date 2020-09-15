import * as React from "react";
import Page from "./Page";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useHistory } from "react-router-dom";
import colours from "~data/colours";

const THRESHOLD = 10;

export default function Start() {
  const history = useHistory();
  const heading = [
    "Find your new favourite book",
    "First, we need to know what type of book you like",
    "Swipe left if you don't like a category",
    "Swipe right if you like a category",
    "Here we go...",
  ];
  const info = [
    "Swipe right to begin",
    "Swipe right to continue",
    "Swipe left to continue",
    "Swipe right to continue",
  ];
  const swipeLeft = [false, false, true, false];
  const [textIndex, setTextIndex] = React.useState(0);
  const swipeCallback = () => {
    if (textIndex === heading.length - 1) {
      history.push("/questions");
    }
    setTextIndex(textIndex + 1);
  };
  return (
    <Page style={{ backgroundColor: colours[textIndex * 2] }}>
      <Content>
        <SwipeItem
          heading={heading[textIndex]}
          info={info[textIndex]}
          swipeLeft={swipeLeft[textIndex]}
          callback={swipeCallback}
          index={textIndex}
        />
      </Content>
    </Page>
  );
}

const SwipeItem = ({
  heading,
  info,
  swipeLeft,
  index,
  callback,
}: {
  heading: string;
  info: string;
  swipeLeft: boolean;
  index: number;
  callback: () => void;
}) => {
  const controls = useAnimation();
  const [infoHighlight] = React.useState(false);

  return (
    <SwipeItemInner
      drag="x"
      style={{ backgroundColor: colours[index * 2] }}
      animate={controls}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={async (_, info) => {
        if (
          (!swipeLeft && info.offset.x < THRESHOLD) ||
          (swipeLeft && info.offset.x > -THRESHOLD)
        ) {
          return;
        }
        const right = info.offset.x > 0;
        await controls.start({
          opacity: 0,
          x: right ? 300 : -300,
        });
        callback();
        await controls
          .start({
            opacity: 1,
            x: 0,
          })
          .then();
      }}
    >
      <HeadingStyled>{heading}</HeadingStyled>
      <Info highlight={infoHighlight}>{info}</Info>
      <motion.div
        initial={{ rotate: "180deg" }}
        animate={{
          rotate: swipeLeft ? "180deg" : "0deg",
        }}
        transition={{ duration: 0.8 }}
        style={{ marginTop: "36px" }}
      >
        <Arrow
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ x: 20 }}
          animate={{ x: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 0.4 }}
        >
          <path d="m21.5 12-4-4v3h-15v2h15v3z" fill="#000" />
        </Arrow>
      </motion.div>
    </SwipeItemInner>
  );
};

const Content = styled("div")`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const SwipeItemInner = styled(motion.div)`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: -1.6rem;
`;

const HeadingStyled = styled("h1")`
  text-align: center;
  font-size: 3.6rem;
  margin: 0 0 2.4rem;
  line-height: 4.2rem;
`;

const Info = styled("p")<{ infoHighlight: boolean }>`
  text-align: center;
  font-size: 1.8rem;
  margin: 0;
  font-weight: normal;
  opacity: ${({ infoHighlight }) => (infoHighlight ? 1 : 0.6)};
`;

const Arrow = styled(motion.svg)`
  display: block;
  margin: 0 auto;
  height: 4.8rem;
  width: 4.8rem;
`;
