import './SearchTweetButton.css';

import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const SearchButton = ({ onClick, variant }) => (
  <Button className='Filed' variant={variant} onClick={onClick}>
    <SearchIcon />
  </Button>
)

export default SearchButton