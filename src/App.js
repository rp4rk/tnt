import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { AppView, ContentContainer, ContentView } from './styled';
import { store } from 'store';
import { Authenticate } from 'components/Authenticate';
import Entries from 'components/Entries';
import Navigation from 'components/Navigation';
const { Sider } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppView className="fullHeight">
          <Sider theme="dark" breakpoint="lg" collapsedWidth="0">
            <Navigation />
          </Sider>
          <ContentView>
            <ContentContainer>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/settings" />}
              />
              <Route exact path="/settings" component={Authenticate} />
              <Route exact path="/entries" component={Entries} />
            </ContentContainer>
          </ContentView>
        </AppView>
      </Router>
    </Provider>
  );
}
export default App;
