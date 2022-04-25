import './TweetItem.css';

import React, { FC } from 'react';

import { useDrag } from 'react-dnd';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const DRAG_TYPE = 'TWEET';
export const STORAGE_KEY = 'TWEETS'
export interface User_Tweet {
    name: string;
    profile_image_link: string;
    screen_name: string;
}

export interface Tweet {
    text: string;
    user: User_Tweet;
    created_at: string;
    id: number;
}

export type TweetProps = {
    profilePicture?: string;
    name: string;
    twitterHandle: string;
    date: string;
    tweetContent: string;
    id: number;
}

export const TweetItem: FC<TweetProps> = ({ profilePicture, name, twitterHandle, date, tweetContent }) => {
    return (
        <div className="Tweet">
            {profilePicture && <img className="Tweet-profilePicture" alt={`${name}'s profile`} />}
            {!profilePicture && <div className="Tweet-profilePicture"><AccountCircleIcon /></div>}
            <div className="Tweet-content-right">
                <div className="Tweet-TopBar">
                    <div className="Tweet-TopBar-names">
                        <h3 className="Tweet-name">{name}</h3>
                        <p style={{ paddingLeft: "1em" }}>{twitterHandle}</p>
                    </div>
                    {date && <p className="Tweet-date">{new Date(date).toLocaleDateString()}</p>}
                </div>
                <p className="Tweet-tweetContent">{tweetContent}</p>
            </div>
        </div>
    )
}
interface DropResult {
    allowedDropEffect: string
    dropEffect: string
    name: string
}


interface DraggableProps {
    handleDrop?: (Tweet: TweetProps) => void;
}

export type DraggableTweetProps = DraggableProps & TweetProps;


const DraggableTweet: FC<DraggableTweetProps> = (props) => {
    const { handleDrop,  ...rest } = props
    const item = { name: rest.name, type: DRAG_TYPE }

    const [{ isDragging }, drag] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: DRAG_TYPE,
        item,
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                const isDropAllowed =
                    dropResult.allowedDropEffect === 'any' ||
                    dropResult.allowedDropEffect === dropResult.dropEffect
                if (isDropAllowed) {
                    handleDrop && handleDrop(rest)
                }
            }

        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <div id="dragContainer" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
          <TweetItem {...rest} />
        </div>
    )

}
export default DraggableTweet



