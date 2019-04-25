import React from "react";
import { connect } from "react-redux";
import { Typography, Divider, Icon, Button } from "antd";
import TimeEntry from "../TimeEntry";
import { createTimeEntry } from "../../actions/entries";
import { getActiveProject } from "../../selectors/projects";
import { ActionHolder } from "./styled";

const { Title, Text } = Typography;

const mapStateToProps = state => ({
  activeProjectId: getActiveProject(state)
});

const mapDispatchToProps = dispatch => ({
  createNewTimeEntry: activeProjectId =>
    dispatch(createTimeEntry(activeProjectId))
});

const Entries = ({ createNewTimeEntry, activeProjectId }) => (
  <>
    <Title level={2}>
      <Icon type="clock-circle" /> Time Entries
    </Title>
    <Text>
      Draft your time entries here, don't worry about making mistakes they won't
      save until you say so!
    </Text>
    <Divider />
    <TimeEntry />
    <ActionHolder>
      <Button
        type="primary"
        onClick={() => createNewTimeEntry(activeProjectId)}
      >
        <Icon type="plus-circle" theme="filled" />
        New Time Entry
      </Button>
    </ActionHolder>
  </>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);
