
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import StatsCard from "@/components/StatsCard";
import PoleCard from "@/components/PoleCard";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

export default function Dashboard() {
  const [data, setData] = useState([]);

  const audioRef = useRef(null);
  const previousFaultCount = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:5000/api/data/history")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const latestByPole = useMemo(() => {
    const grouped = {};

    data.forEach((item) => {
      if (
        !grouped[item.poleId] ||
        new Date(item.timestamp) >
          new Date(grouped[item.poleId].timestamp)
      ) {
        grouped[item.poleId] = item;
      }
    });

    return Object.values(grouped);
  }, [data]);

  const total = latestByPole.length;

  const faults = latestByPole.filter(
    (d) => d.status === "fault"
  ).length;

  const theft = latestByPole.filter(
    (d) => d.theftDetected
  ).length;

  const normal = latestByPole.filter(
    (d) => d.status === "healthy"
  ).length;

  useEffect(() => {
    if (faults > previousFaultCount.current) {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }

    previousFaultCount.current = faults;
  }, [faults]);

  return (
    <div className="min-h-screen bg-[#ece8df] overflow-hidden">

      {/* HEADER */}
      <div className="bg-[#007a3d] py-2 border-b-4 border-[#005f2f]">

        <div className="flex items-center justify-center gap-3">

          <span className="text-3xl">
            🌱
          </span>

          <h1 className="text-white font-extrabold text-2xl md:text-4xl leading-snug text-center">
            Smart Grid Monitoring
            <br />
            Dashboard
          </h1>

        </div>

      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-4 gap-1 px-1 py-1 bg-[#ece8df]">

        <StatsCard
          title="Total Poles"
          value={total}
          bg="bg-[#d8f0d2]"
          text="text-[#2e7d32]"
        />

        <StatsCard
          title="Faults"
          value={faults}
          bg="bg-[#f7d7d7]"
          text="text-[#d32f2f]"
        />

        <StatsCard
          title="Theft"
          value={theft}
          bg="bg-[#efe4bd]"
          text="text-[#d68910]"
        />

        <StatsCard
          title="Normal"
          value={normal}
          bg="bg-[#d8f0d2]"
          text="text-[#2e7d32]"
        />

      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-2 px-1 pb-1 h-[calc(100vh-150px)]">

        {/* MAP */}
        <div className="bg-white border border-[#bfb7aa] overflow-hidden relative">

          <MapView poles={latestByPole} />

        </div>

        {/* POLE STATUS */}
        <div className="bg-[#efe6d4] border border-[#cdbf9e] p-2 overflow-y-auto">

          <h2 className="text-center font-bold text-[#4d3a15] text-xl mb-2 border-b border-[#cdbf9e] pb-2">
            Pole Status
          </h2>

          <div className="space-y-2">

            {latestByPole.map((pole, index) => (
              <PoleCard
                key={pole._id || index}
                pole={pole}
              />
            ))}

          </div>

        </div>

      </div>

      <audio
        ref={audioRef}
        src="/beep.mp3"
        preload="auto"
      />

    </div>
  );
}
