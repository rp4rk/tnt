import React, { useState } from "react";
import { DatePicker, Checkbox } from "antd";

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
  const [showRangePicker, toggleRangePicker] = useState(false);

  return (
    <div>
      {(showRangePicker && (
        <RangePicker style={{ width: "100%" }} onChange={console.log} />
      )) || <DatePicker style={{ width: "100%" }} onChange={console.log} />}
      <Checkbox
        checked={showRangePicker}
        onChange={e => toggleRangePicker(e.target.checked)}
      >
        Daily
      </Checkbox>
    </div>
  );
};

export default DateRangePicker;
