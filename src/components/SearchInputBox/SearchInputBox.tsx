import React, {
  FC,
  InputHTMLAttributes,
} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;

}

export const searchInputBox: FC<InputProps> = ({name, ...rest}) => <input className="Input" id={name}  {...rest} />

export default searchInputBox