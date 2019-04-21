import React, { useState } from "react";
import { DatePicker, Checkbox } from "antd";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const Controls = styled.div`
  margin-bottom: 12px;
`;

const DateRangePicker = () => {
  const [showRangePicker, toggleRangePicker] = useState(false);

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
          <Checkbox checked={false}>Include weekends?</Checkbox>
        )}
      </Controls>

      {(showRangePicker && (
        <RangePicker style={{ width: "100%" }} onChange={console.log} />
      )) || <DatePicker style={{ width: "100%" }} onChange={console.log} />}
    </div>
  );
};

export default DateRangePicker;
