"use client";
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Gantt from "@/components/Gantt";

const data = {
  data: [
    {
      id: 1,
      text: "Task #1",
      start_date: "2023-09-03",
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      text: "Task #2",
      start_date: "2023-09-05",
      duration: 3,
      progress: 0.4,
    },
    {
      id: 3,
      text: "Task #2",
      start_date: "2023-08-05",
      duration: 3,
      progress: 0.4,
    },
  ],
  links: [{ id: 1, source: 1, target: 2, type: "0" }],
};

export default function Page() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <PageTitle name="MaYi‘s Gantt Chart" />
      <hr className="container mb-4" />
      <div className="gantt-container p-4">
        <Gantt tasks={data} />
      </div>
    </div>
  );
}
