import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Tour from 'reactour';
import { connect } from 'react-redux';
import { setTutorialViewed } from 'actions/tutorials';
import { getTutorialViewedStatus } from 'selectors/tutorials';
import { Button, Tooltip } from 'antd';

const mapStateToProps = (state, { tutorial }) => ({
  viewed: getTutorialViewedStatus(state, tutorial)
});

const mapDispatchToProps = (dispatch, { tutorial }) => ({
  setViewed: status => dispatch(setTutorialViewed(tutorial, status))
});

const ButtonPortal = props =>
  ReactDOM.createPortal(props.children, document.querySelector('#root'));

const Tutorial = ({ steps, setViewed, viewed }) => {
  const [open, setOpen] = useState(!viewed);

  return (
    <>
      <ButtonPortal>
        <Tooltip title="View Tutorial" placement="left">
          <Button
            style={{ position: 'fixed', bottom: 16, right: 16 }}
            type="primary"
            shape="circle"
            icon="question"
            onClick={() => setOpen(true)}
          />
        </Tooltip>
      </ButtonPortal>
      <Tour
        steps={steps}
        isOpen={open}
        onRequestClose={() => {
          setOpen(false);
          setViewed(true);
        }}
      />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutorial);
