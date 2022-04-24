import React, {
  FC,
  InputHTMLAttributes,
} from 'react';

import styled from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;

}

export const searchInputBox: FC<InputProps> = ({ name, ...rest }) => <input className="Input" id={name}  {...rest} />
const StyledInput = styled(searchInputBox)`
height: 100%;
padding: 0;
width: 100%;
border-style: solid;
margin-right: 1em;
`
export default StyledInput