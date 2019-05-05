import styled from 'styled-components';

import { Layout } from 'antd';

const { Content } = Layout;

export const Main = styled.main``;

export const AppView = styled(Layout)`
  && {
    min-height: 100vh;
  }
`;

export const ContentView = styled(Layout)`
  padding: 24px;
  display: block;

  & main {
    max-width: 960px;
    background-color: white;
    margin: 0 auto;

    box-sizing: border-box;
    padding: 24px;

    border-radius: 3px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.02);

    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const ContentContainer = styled(Content)``;
