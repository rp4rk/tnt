import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';

const mapStateToProps = state => ({
  redmineAddress: getRedmineAddress(state),
  redmineKey: getRedmineKey(state)
});

const Navigation = ({ location, redmineAddress, redmineKey }) => {
  const { pathname } = location;

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['/settings']}
      selectedKeys={[pathname]}
    >
      <Menu.Item key="/settings">
        <Link to="settings">
          <Icon type="setting" />
          <span>Settings</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/entries" disabled={!redmineAddress || !redmineKey}>
        <Link to="entries">
          <Icon type="clock-circle" />
          <span>Time Entries</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(connect(mapStateToProps)(Navigation));
