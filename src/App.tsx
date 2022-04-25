import './App.css';

import React, {
  FC,
  useState,
} from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import {
  SavedHeader,
  SearchContainer,
  TopBar,
  TweetContainerWrapper,
} from './app.style';
import Header from './components/Header/Header';
import StyledInput from './components/SearchInputBox/SearchInputBox';
import StyledSearchButton
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

  let reformattedTweets

    const tweets = service.status === 'loaded' && searchTerm ? service.payload : []
    reformattedTweets = tweets && tweets.map((tweet: Tweet) => {
      return {
        name: tweet.user.name,
        twitterHandle: tweet.user.screen_name,
        date: tweet.created_at,
        tweetContent: tweet.text,
        id: tweet.id,
      }
    });


  const removedDroppedItem = (item) => {
     reformattedTweets =  reformattedTweets.filter((element)=>element.id !== item.id);

  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div >
        <Header headerText="Tweet Saver By Bing">
          <TopBar>
            <SearchContainer>
              <StyledInput type="input" name="tweetSearch"
                placeholder="Search Twitter By KeyWords"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <StyledSearchButton onClick={(e) => {
                setSearchTerm(searchInput)
              }} variant="contained" />

            </SearchContainer>
            <SavedHeader id="savedTweetHeader">Saved Tweets</SavedHeader>
          </TopBar>
          <div id="searchResult" style={{ paddingTop: "1em" }}>
            {service && service.status === 'loading' && <div>Loading...</div>}
            {service && service.status === 'loaded' && <div>Loaded the latest 10 items from Twitter API </div>}
            {service && service.status === 'error' && (
              <div>Error loading the request!</div>
            )}
          </div>
          <TweetContainerWrapper id="tweetsItem">
            <DroppableTweetContainer

              tweets={reformattedTweets}
              handleDrop={(tweet: any) => {

                removedDroppedItem(tweet)
                setLocalStorageKey(STORAGE_KEY, [tweet])
                setLocalStorageTweets(getLocalStorageKey(STORAGE_KEY))
              }}
            />
            <div className="Home-Page--Tweet-Container-Wrapper-Guidance">
              <p> Drag Tweets</p>
              <ArrowRightAltIcon />
              <p>to save</p>
            </div>
            <DroppableTweetContainer

              tweets={localStorageTweets}
              allowedDropEffect="move"
            />
          </TweetContainerWrapper>
        </Header>
      </div>
    </DndProvider>
  )
}

export default App