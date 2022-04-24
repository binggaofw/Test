import React, {
  FC,
  ReactNode,
} from 'react';

import {
  Content,
  HeaderTitle,
  Page,
  PageLine,
} from './Header.style';

export type PageProps = {
    headerText?: string;
    children: ReactNode;
}

export const Header: FC<PageProps> = ({ headerText, children }) => (
    <Page>
        {headerText && <HeaderTitle>
            {headerText}
        </HeaderTitle>}
        <PageLine />
        <Content>
            {children}
        </Content>
    </Page>
)

export default Header