import React, { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_broadway.css";
import "./Gantt.css";

export default class Gantt extends Component {
  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.touch = "force";
    // gantt.config.autosize = true;
    gantt.config.columns = [
      {name: "text", tree: true, width: "*", resize: true},
      {name: "start_date", align: "center", resize: true},
      {name: "add", width: 44}
    ];
    gantt.config.scales = [
      {unit: "month", step: 1, format: "%F, %Y"},
      {unit: "day", step: 1, format: "%j, %D"}
    ];
    gantt.templates.task_class = function (st, end, item) {
      return item.$level == 0 ? "gantt_project" : ""
    };
    gantt.createDataProcessor((entityType, action, item, id) => {
      return new Promise((resolve, reject) => {
        console.log({ entityType, action, item, id });
        console.log("Serialized JSON:", gantt.serialize());
        return resolve();
      });
    });
    const { tasks } = this.props;
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  render() {
    return (
      <div
        ref={(input) => {
          this.ganttContainer = input;
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}
