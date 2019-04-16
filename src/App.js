import React from "react";
import { Provider } from "react-redux";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AppView, ContentContainer, ContentView } from "./styled";
import { Authenticate } from "./components/Authenticate";
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
                <span>Authenticate</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <ContentView>
            <ContentContainer>
              <Route exact match="/" component={Authenticate} />
            </ContentContainer>
          </ContentView>
        </AppView>
      </Router>
    </Provider>
  );
}
export default App;
