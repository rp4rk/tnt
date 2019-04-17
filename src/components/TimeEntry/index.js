import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import { getProjects } from "../../actions/projects";

const { TabPane } = Tabs;

const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(getProjects())
});

export function TimeEntryUnconnected({ getProjects }) {
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Foundation Medicine" key="1" />
      <TabPane tab="Triverus" key="2" />
    </Tabs>
  );
}

export const TimeEntry = connect(
  null,
  mapDispatchToProps
)(TimeEntryUnconnected);
