"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import StatsCard from "@/components/StatsCard";
import PoleCard from "@/components/PoleCard";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false
});

export default function Dashboard() {
  const [data, setData] = useState([]);

  const audioRef = useRef(null);
  const previousFaultCount = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/data/history`)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Group latest record per pole
  const latestByPole = useMemo(() => {
    const grouped = {};

    data.forEach(item => {
      if (
        !grouped[item.poleId] ||
        new Date(item.timestamp) > new Date(grouped[item.poleId].timestamp)
      ) {
        grouped[item.poleId] = item;
      }
    });

    return Object.values(grouped);
  }, [data]);

  const total = latestByPole.length;
  const faults = latestByPole.filter(d => d.status === "fault").length;
  const theft = latestByPole.filter(d => d.theftDetected).length;
  const normal = latestByPole.filter(d => d.status === "healthy").length;

  
  useEffect(() => {
    if (faults > previousFaultCount.current) {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }

    previousFaultCount.current = faults;
  }, [faults]);

  return (
    <div className="min-h-screen p-6 bg-[#0f172a] text-white">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          ⚡ Smart Grid Control Center
        </h1>
        <p className="text-gray-400 mt-2">
          Real-time LT Line Monitoring System
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Poles" value={total} color="cyan" />
        <StatsCard title="Faults" value={faults} color="red" />
        <StatsCard title="Theft Alerts" value={theft} color="yellow" />
        <StatsCard title="Normal" value={normal} color="green" />
      </div>

      {/* Map + Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-gray-700">
          <MapView poles={latestByPole} />
        </div>

        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
          {latestByPole.map((pole, index) => (
            <PoleCard key={pole._id || index} pole={pole} />
          ))}
        </div>

      </div>

      {/* 🔊 Audio Element */}
      <audio ref={audioRef} src="/fahhh.mp3" preload="auto" />
      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>
          Built with ⚡ by <span className="text-green-400 font-semibold">Gk-The-Coder</span>
        </p>
      </footer>
    </div>
  );
}
