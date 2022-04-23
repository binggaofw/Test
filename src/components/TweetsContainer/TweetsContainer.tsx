import './TweetsContainer.css';

import React, { FC } from 'react';

import { useDrop } from 'react-dnd';

import TweetItem, {
  DRAG_TYPE,
  TweetProps,
} from '../TweetItem/TweetItem';

export type TweetsContainerProps = {
    tweets: TweetProps[];
    handleDrop?: (Tweet: TweetProps) => void;
  }

export const TweetsContainer: FC<TweetsContainerProps> = ({tweets, ...rest}) => (
    <div className="Tweets-Container">
        {tweets && tweets.map((tweet) => <TweetItem key={tweet.id}{...tweet} {...rest}/>)}
    </div>
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
    if(!allowedDropEffect) return <TweetsContainer {...rest}/>
    const isActive = canDrop && isOver
    return (
      <div
        ref={drop}
        role={'Dustbin'}
        style={{ backgroundColor: isActive ? 'pink' : 'white', width: '100%' }}
        className="DroppableTweetContainer"
      >
         <TweetsContainer {...rest}/>
      </div>
    )
  }



export default DroppableTweetContainer