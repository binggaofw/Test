import styled from 'styled-components';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const SearchButton = ({ onClick, variant }) => (
  <Button variant={variant} onClick={onClick}>
    <SearchIcon />
  </Button>
)

const StyledSearchButton = styled(SearchButton)`
width: 80%;
height: 100%;
`


export default StyledSearchButton