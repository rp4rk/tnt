import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Menu, Dropdown, Modal } from 'antd';
import styled from 'styled-components';
import { setProjectAlias } from 'actions/projects';
import { useInput } from 'util/useInput';
import { getProjectName } from 'selectors/projects';
import IssuePrompt from 'components/IssuePrompt';

const TabWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: 250px;
`;

const TabButton = styled(Button)`
  margin-right: 24px;
  flex-shrink: 0;
  &&& i {
    margin: 0;
  }
`;

const OverflowSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const mapStateToProps = (state, props) => ({
  projectName: getProjectName(state, props.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  setProjectAlias: alias => dispatch(setProjectAlias(props.id, alias))
});

const PreferenceTab = ({ setProjectAlias, projectName, id: projectId }) => {
  const [editing, toggleEditing] = useState(false);
  const [settingIssue, toggleIssuePrompt] = useState(false);
  const [alias, setAlias] = useInput(projectName);

  const menu = (
    <Menu>
      <Menu.Item onClick={() => toggleEditing(true)}>
        <span>Set Project Name</span>
      </Menu.Item>
      <Menu.Item onClick={() => toggleIssuePrompt(true)}>
        <span>Set Default Issue</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Modal
        title={`Choose a Default Issue for ${projectName}.`}
        visible={settingIssue}
        footer={null}
        onCancel={() => toggleIssuePrompt(false)}
      >
        <IssuePrompt projectId={projectId} />
      </Modal>
      <TabWrapper>
        {(editing && (
          <>
            <TabButton
              shape="circle-outline"
              icon="save"
              onClick={e => {
                e.stopPropagation();
                toggleEditing(false);
                setProjectAlias(alias);
              }}
            />
            <Input
              autoFocus={true}
              onChange={setAlias}
              defaultValue={projectName}
              onClick={e => {
                e.stopPropagation();
              }}
            />
          </>
        )) || (
          <>
            <Dropdown overlay={menu}>
              <TabButton shape="circle-outline" icon="setting" />
            </Dropdown>
            <OverflowSpan>{projectName}</OverflowSpan>
          </>
        )}
      </TabWrapper>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferenceTab);
