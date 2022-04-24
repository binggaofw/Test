import React, { FC } from 'react';

import { useDrop } from 'react-dnd';
import styled from 'styled-components';

import TweetItem, {
  DRAG_TYPE,
  TweetProps,
} from '../TweetItem/TweetItem';

export type TweetsContainerProps = {
  tweets: TweetProps[];
  handleDrop?: (Tweet: TweetProps) => void;
}
export const StyledTweetsContainer = styled.div`
  height: 65vh;
  border: 0.1em solid black;
  overflow:scroll;
  width: 100%;
  `


export const TweetsContainer: FC<TweetsContainerProps> = ({ tweets, ...rest }) => (
  <StyledTweetsContainer>
    {tweets && tweets.map((tweet) => <TweetItem key={tweet.id}{...tweet} {...rest} />)}
  </StyledTweetsContainer>
)


interface DroppableProps {
  allowedDropEffect?: string;
}

type DroppableTweetProps = DroppableProps & TweetsContainerProps;

export const DroppableTweetContainer: FC<DroppableTweetProps> = ({ allowedDropEffect, ...rest }) => {
  const [{ canDrop, isOver }, drop] = useDrop({

    accept: DRAG_TYPE,
    drop: () => ({
      name: `${allowedDropEffect} Dustbin`,
      allowedDropEffect,
    }),

    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  if (!allowedDropEffect) return <TweetsContainer {...rest} />
  const isActive = canDrop && isOver
  return (
    <div id="savedTweetsContainer"
      ref={drop}
      style={{ backgroundColor: isActive ? 'pink' : 'white', width: '100%' }}
    >
      <TweetsContainer {...rest} />
    </div>
  )
}



export default DroppableTweetContainer