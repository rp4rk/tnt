import React from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

const Navigation = ({ location }) => {
  const { pathname } = location;

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["/settings"]}
      selectedKeys={[pathname]}
    >
      <Menu.Item key="/settings">
        <Link to="settings">
          <Icon type="setting" />
          <span>Settings</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/entries">
        <Link to="entries">
          <Icon type="clock-circle" />
          <span>Time Entries</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(Navigation);
