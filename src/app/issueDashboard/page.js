"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function StatusBar() {
  const [completedIssues, setCompletedIssue] = useState("")
  const [pendingIssues, setPendingIssues] = useState("")
  const [inProgressIssues, setInProgressIssues] = useState("")

  useEffect(() => {

    let data = JSON.stringify({
      "lat": 30.38448,
      "lng": 77.93134
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/getIssues',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setCompletedIssue(response.data.completed.length)
        setInProgressIssues(response.data.inProgress.length)
        setPendingIssues(response.data.pending.length)
      })
      .catch((error) => {
        console.log(error);
      });


  }, [])


  return (
    <div className="flex gap-4 p-4">

      {/* Pending */}
      <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Pending
          </span>
        </div>
        <span className="text-xs font-bold bg-amber-500 text-black px-2 py-0.5 rounded-full">
          {pendingIssues}
        </span>
      </div>

      {/* In Progress */}
      <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            In Progress
          </span>
        </div>
        <span className="text-xs font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">
          {inProgressIssues}
        </span>
      </div>

      {/* Completed */}
      <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-green-500">
            Completed
          </span>
        </div>
        <span className="text-xs font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">
          {completedIssues}
        </span>
      </div>

    </div>
  );
}