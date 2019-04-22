import React, { useState } from "react";
import { connect } from "react-redux";
import { DatePicker, Checkbox } from "antd";
import styled from "styled-components";

import { updateTimeEntry } from "../../actions/entries";
import { getEntryProperty } from "../../selectors/entries";

const { RangePicker } = DatePicker;

const Controls = styled.div`
  margin-bottom: 12px;
`;

const mapStateToProps = (state, { projectId, entryId }) => ({
  fromDate: getEntryProperty(state, projectId, entryId, "fromDate"),
  toDate: getEntryProperty(state, projectId, entryId, "toDate"),
  includeWeekends: getEntryProperty(
    state,
    projectId,
    entryId,
    "includeWeekends"
  )
});

const mapDispatchToProps = (dispatch, { projectId, entryId }) => ({
  setFromDate: value =>
    dispatch(updateTimeEntry(projectId, entryId, "fromDate", value.toDate())),
  setToDate: value =>
    dispatch(updateTimeEntry(projectId, entryId, "toDate", value.toDate())),
  setIncludeWeekends: e =>
    dispatch(
      updateTimeEntry(projectId, entryId, "includeWeekends", e.target.checked)
    )
});

const DateRangePicker = ({
  setFromDate,
  setToDate,
  setIncludeWeekends,
  includeWeekends
}) => {
  const [showRangePicker, toggleRangePicker] = useState(false);

  const splitRangeSet = dates => {
    setFromDate(dates[0]);
    setToDate(dates[1]);
  };

  return (
    <div>
      <Controls>
        <Checkbox
          checked={showRangePicker}
          onChange={e => toggleRangePicker(e.target.checked)}
        >
          Multiple Days?
        </Checkbox>
        {showRangePicker && (
          <Checkbox onChange={setIncludeWeekends} checked={includeWeekends}>
            Include weekends?
          </Checkbox>
        )}
      </Controls>

      {(showRangePicker && (
        <RangePicker style={{ width: "100%" }} onChange={splitRangeSet} />
      )) || <DatePicker style={{ width: "100%" }} onChange={setFromDate} />}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateRangePicker);
