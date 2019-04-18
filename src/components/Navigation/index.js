import React from "react";
import { Menu } from "antd";
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
          <span>Settings</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/entries">
        <Link to="entries">
          <span>Time Entries</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(Navigation);
