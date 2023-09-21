"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";
const Gantt = dynamic(() => import("@/components/Gantt"), {
  ssr: false,
});

const request = axios.create({
  baseURL: `${process.env.BASE_API_URL}/gantt`,
  timeout: 10000,
});

const initGanttChartData = {
  tasks: [],
  links: []
}

export default function Page({ params }: { params: { slug: string } }) {
  const ganttChartId = params.slug
  const [ganttChartData, setGanttChartData] = useState(initGanttChartData);
  const [loading, setLoading] = useState(true)
  const onChangeGanttChartData = (data: {}) => {
    // console.log('Update data:', data);
    const patchGanttChartData = async (id: string, data: Object) => {
      setLoading(true)
      const results = await request.put(`/patch/${id}`, data);
      // console.log("Patch Results:", results);
      setLoading(false)
    }
    patchGanttChartData(ganttChartId, data).catch(() => {
      alert('Patch Gantt Chart Data failed! Please check your network!')
    });
  }
  const onCreateGanttChartData = () => {
    const createGanttChartData = async (data: Object) => {
      setLoading(true)
      const results = await request.post(`/create`, data);
      // console.log("Creating Results:", results);
      setLoading(false)
      const {
        data: { id },
      } = results;
      window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/'))+ `/${id}`;
    }
    if (confirm('Creating New Gantt Chart?')) {
      createGanttChartData({
        data: [],
        links: []
      }).catch(() => {
        alert('Creating Gantt Chart Data failed! Please check your network!')
      });
    }
  }
  const onFetchGanttChartData = () => {
    console.debug("Gantt Chart Id:", ganttChartId);
    // fetch the GanttChartData
    const fetchGanttChartData = async (id: string) => {
      setLoading(true)
      const results = await request.get(`/read/${id}`);
      setLoading(false)
      // console.log("Read Results:", results);
      if (results.data.status === 500) {
        throw Error()
      }
      const {
        data: { data },
      } = results;
      setGanttChartData(data);
    };
    fetchGanttChartData(ganttChartId).catch(() => {
      alert('Gantt Chart Data is not found! Please check your link carefully!')
    });
  }
  // init the page
  useEffect(() => {
    onFetchGanttChartData()
  }, []);
  //
  // useEffect(() => {
  //   console.log('Updated Data:', ganttChartData);
  // });
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <PageTitle name="Gantt Chart" />
      <div className="container w-full flex items-center justify-end mb-2">
        <button type='button' className='text-xs bg-white hover:bg-gray-100 text-gray-400 py-1 px-2 mx-1 border border-gray-400 rounded shadow' onClick={onFetchGanttChartData}>
          { loading ? <Spinner/> : 'Sync'}
        </button>
        <button type='button' className='text-xs bg-white hover:bg-gray-100 text-gray-400 py-1 px-2 mx-1 border border-gray-400 rounded shadow' onClick={onCreateGanttChartData}>+ New</button>
      </div>
      <hr className="container mb-4" />
      <div className="w-full h-full flex flex-col p-4 relative">
        <Gantt tasks={ganttChartData} onDataChange={onChangeGanttChartData} />
      </div>
    </div>
  );
}
