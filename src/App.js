import React from "react";
import { Provider } from "react-redux";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { AppView, ContentContainer, ContentView } from "./styled";
import { Authenticate } from "./components/Authenticate";
import { Entries } from "./components/Entries";
import { store } from "./store";
const { Sider } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppView className="fullHeight">
          <Sider theme="dark" breakpoint="lg" collapsedWidth="0">
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/">
                  <span>Authenticate</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="entries">
                  <span>Entries</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <ContentView>
            <ContentContainer>
              <Route exact path="/" component={Authenticate} />
              <Route path="/entries" component={Entries} />
            </ContentContainer>
          </ContentView>
        </AppView>
      </Router>
    </Provider>
  );
}
export default App;
