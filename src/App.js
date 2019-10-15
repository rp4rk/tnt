import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { AppView, ContentContainer, ContentView } from './styled';
import { Authenticate } from './components/Authenticate';
import { store } from './store';
import Entries from './components/Entries';
import Navigation from './components/Navigation';
import EntryTable from './components/EntryTable';
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
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => <Redirect to="/settings" />}
                />
                <Route exact path="/settings" component={Authenticate} />
                <Route exact path="/entries" component={Entries} />
                <Route exact path="/table" component={EntryTable} />
                <Route component={() => <Redirect to="/settings" />} />
              </Switch>
            </ContentContainer>
          </ContentView>
        </AppView>
      </Router>
    </Provider>
  );
}
export default App;
