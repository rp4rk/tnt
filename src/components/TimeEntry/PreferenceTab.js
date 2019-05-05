import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import { setProjectAlias } from '../../actions/projects';
import { useInput } from '../../util/useInput';
import { getProjectName } from '../../selectors/projects';

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

const PreferenceTab = ({ setProjectAlias, projectName }) => {
  const [editing, toggleEditing] = useState(false);
  const [alias, setAlias] = useInput(projectName);

  return (
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
          <TabButton
            shape="circle-outline"
            icon="edit"
            onClick={e => {
              e.stopPropagation();
              toggleEditing(true);
            }}
          />
          <OverflowSpan>{projectName}</OverflowSpan>
        </>
      )}
    </TabWrapper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferenceTab);
