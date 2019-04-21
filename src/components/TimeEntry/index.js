import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import { fetchProjects } from "../../actions/projects";
import { getActiveProjects } from "../../selectors/projects";
import PreferenceTab from "./PreferenceTab";
import Entry from "../Entry";

const { TabPane } = Tabs;

const mapStateToProps = state => ({
  projects: getActiveProjects(state)
});

const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(fetchProjects())
});

function TimeEntry({ getProjects, projects }) {
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Tabs tabPosition="left">
      {projects.map(project => (
        <TabPane key={project.id} tab={<PreferenceTab id={project.id} />}>
          <Entry project={project.id} />
        </TabPane>
      ))}
    </Tabs>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeEntry);
