import * as React from "react";
import styled from "styled-components";
import { QuestionItem, UpdateQuestion } from "~types";
import { motion, useAnimation } from "framer-motion";

interface Props {
  question: QuestionItem;
  updateQuestion: UpdateQuestion;
  index: number;
  zIndex: number;
  colour: string;
  active: boolean;
  hide: boolean;
}

const THRESHOLD = 200;

export default function Question({
  question,
  updateQuestion,
  index,
  zIndex,
  colour,
  active,
  hide,
}: Props) {
  const controls = useAnimation();
  return hide ? null : (
    <Card
      zIndex={zIndex}
      drag={active}
      active={active}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDrag={(_, info) => console.log(info.offset.x)}
      onDragEnd={async (_, info) => {
        if (info.offset.x < THRESHOLD && info.offset.x > -THRESHOLD) {
          return;
        }
        const approve = info.offset.x > 0;
        await controls.start({
          opacity: 0,
          x: approve ? 300 : -300,
          y: info.offset.y,
        });
        updateQuestion(question.id, info.offset.x > 0);
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.1 }}
      animate={controls}
    >
      <CardContext index={index}>
        <CardContent colour={colour} index={index}>
          <Heading>{question.name}</Heading>
        </CardContent>
      </CardContext>
    </Card>
  );
}

const Heading = styled.h1`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

const Card = styled(motion.div)<{ zIndex: number; active: boolean }>`
  margin: 0 auto;
  border-radius: 2.4rem;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex};
  transform-origin: center;
  cursor: ${({ active }) => (active ? "grab" : undefined)};
`;

const CardContext = styled.div<{ index: number }>`
  transform-origin: top;
  transform: ${({ index }) =>
    `translate(0, -${index * 5}px) scale(${(10 - index) / 10})`};
  background: #fff;
  height: 100%;
  border-radius: 2.4rem;
`;

const CardContent = styled.div<{ colour: string; index: number }>`
  background-color: ${({ colour }) => colour};
  opacity: ${({ index }) => (10 - index) / 10};
  border-radius: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
