import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import { fetchProjects } from "../../actions/projects";
import { getProjects } from "../../selectors/projects";
import PreferenceTab from "./PreferenceTab";
import Entry from "../Entry";

const { TabPane } = Tabs;

const mapStateToProps = state => ({
  projects: getProjects(state)
});

const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(fetchProjects())
});

export function TimeEntryUnconnected({ getProjects, projects }) {
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Tabs tabPosition="left">
      {projects.map(project => (
        <TabPane key={project.id} tab={<PreferenceTab id={project.id} />}>
          <Entry />
        </TabPane>
      ))}
    </Tabs>
  );
}

export const TimeEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeEntryUnconnected);
