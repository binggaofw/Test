import './Header.css';

import React, {
  FC,
  ReactNode,
} from 'react';

export type PageProps = {
    headerText?: string;
    children: ReactNode;
  }

export const Header: FC<PageProps> = ({headerText, children}) => (
    <div className="Page">
        {headerText && <h1 className="Page-Header">
            {headerText}
        </h1>}
        <div className="Page-line"/>
        <div className="Page-content">
            {children}
        </div>
    </div>
)

export default Header