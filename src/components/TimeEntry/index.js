import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export function TimeEntry() {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Foundation Medicine" key="1" />
      <TabPane tab="Triverus" key="2" />
    </Tabs>
  );
}
