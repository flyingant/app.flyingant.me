"use client";
import React, { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_meadow.css"
import "./Gantt.css";

export default class Gantt extends Component {
  componentDidMount() {
    const { tasks, onDataChange } = this.props;
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.touch = "force";
    gantt.config.columns = [
      { name: "text", label: 'Task', align: "left", tree: true, width: "*"},
      // { name: "start_date", label: 'Start at', align: "center" },
		  { name: "duration", align: "center"},
      { name: "add", width: 44 },
    ];
    const weekScaleTemplate = function (date) {
      var dateToStr = gantt.date.date_to_str("%d %M");
      var weekNum = gantt.date.date_to_str("(Week %W)");
      var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
      return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
    };
    gantt.config.scales = [
      {unit: "month", step: 1, format: "%F, %Y"},
		  {unit: "week", step: 1, format: weekScaleTemplate},
		  {unit: "day", step: 1, format: "%d %D"}
    ];
    gantt.config.scale_height = 54;
    gantt.locale.labels.section_period = "Time period";
    gantt.config.lightbox.sections = [
      {name: "description", height: 40, map_to: "text", type: "textarea", focus: true},
      {name: "period", type: "time", map_to: "auto"}
    ];
    gantt.templates.task_class = function (st, end, item) {
      return item.$level == 0 ? "gantt_project" : "";
    };
    gantt.templates.leftside_text = function (start, end, task) {
      return task.duration + " days";
    };
    gantt.createDataProcessor((entityType, action, item, id) => {
      return new Promise((resolve, reject) => {
        const serializedGanttData = gantt.serialize();
        console.debug("Action:", { entityType, action, item, id });
        onDataChange(serializedGanttData);
        return resolve();
      });
    });
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  componentDidUpdate() {
    const { tasks } = this.props;
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
