import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import { fetchProjects, setActiveProject } from "../../actions/projects";
import { getActiveProjects, getActiveProject } from "../../selectors/projects";
import PreferenceTab from "./PreferenceTab";
import Entry from "../Entry";
import { getEntriesForProject } from "../../selectors/entries";

const { TabPane } = Tabs;

const mapStateToProps = state => ({
  projects: getActiveProjects(state),
  activeProject: getActiveProject(state),
  entries: getEntriesForProject(state, getActiveProject(state))
});

const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(fetchProjects()),
  setActiveProject: id => dispatch(setActiveProject(id))
});

function TimeEntry({
  getProjects,
  projects,
  activeProject,
  setActiveProject,
  entries
}) {
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Tabs
      tabPosition="left"
      onChange={setActiveProject}
      activeKey={String(activeProject)}
    >
      {projects.map(project => (
        <TabPane key={project.id} tab={<PreferenceTab id={project.id} />}>
          {entries &&
            entries.map((entry, idx) => (
              <Entry key={idx} projectId={project.id} entryId={idx} />
            ))}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeEntry);
