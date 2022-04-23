import './App.css';

import React, {
  FC,
  useState,
} from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import Header from './components/Header/Header';
import SearchInputBox from './components/SearchInputBox/SearchInputBox';
import SearchTweetButton
  from './components/SearchTweetButton/SearchTweetButton';
import {
  STORAGE_KEY,
  Tweet,
} from './components/TweetItem/TweetItem';
import DroppableTweetContainer
  from './components/TweetsContainer/TweetsContainer';
import useTweetSearch from './hooks/tweetsaver/useTweetSearch';
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from './utils/localStorage';

export const App: FC<{}> = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [localStorageTweets, setLocalStorageTweets] = useState(getLocalStorageKey(STORAGE_KEY) || [])
   const service = useTweetSearch(searchTerm);
      service.status === 'loaded' ? console.log(service.payload) : console.log(service)
      const tweets = service.status === 'loaded' && searchTerm ? service.payload : []
      const reformattedTweets = tweets && tweets.map((tweet: Tweet)  => {
          return {
              name: tweet.user.name,
              twitterHandle: tweet.user.screen_name,
              date: tweet.created_at,
              tweetContent: tweet.text,
              id: tweet.id,
          }
      });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Saver-Page">
        <Header headerText="Tweet Saver">
          <div className="Saver-Page--Top-Bar">
            <div className="Saver-Page--Search-Container">
              <SearchInputBox className="Saver-Page--Search-Container-Input" type="input" name="Tweet-Search"
                placeholder="Search Twitter by content"
             onChange={(e)=> setSearchInput(e.target.value)}
              />
    <div className="Saver-Page--Search-Container-Icon">
        <SearchTweetButton onClick={(e) => {
                     setSearchTerm(searchInput)
                }} variant="contained"  />
</div>
            </div>
            <h2 className="Saver-Page--Saved-Header">Saved Tweets</h2>
          </div>
          <div className="Saver-Page--Search-Status">
                        {service && service.status === 'init' && <p>Please enter some text to start</p> }
                        {service && service.status === 'loading' && <div>Loading...</div>}
                        {service && service.status === 'loaded' && <div>Loaded </div>}
                        {service && service.status === 'error' && (
                         <div>Error loading the request, sorry!</div>
                            )}
                    </div>
          <div className="Saver-Page--Tweet-Container-Wrapper">
            <DroppableTweetContainer
             tweets={reformattedTweets}
              handleDrop={(tweet: any) => {
                console.log('list one',tweet)
                setLocalStorageKey(STORAGE_KEY, [tweet])
                setLocalStorageTweets(getLocalStorageKey(STORAGE_KEY))
              }}
            />
            <div className="Saver-Page--Tweet-Container-Wrapper-Guidence">
              <p> Drag Tweets</p>
              <ArrowRightAltIcon />
              <p>to save</p>
            </div>
            <DroppableTweetContainer
              tweets={localStorageTweets}
              allowedDropEffect="move"
            />
          </div>
        </Header>
      </div>
    </DndProvider>
  )
}

export default App