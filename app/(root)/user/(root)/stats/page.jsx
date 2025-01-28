"use client";
import React, { useState } from "react";
import General from "../../components/Statsitics/General";

const Stats = () => {
  const [activeTab, setActiveTab] = useState(1);
  const general = [
    { id: 1, totalPartners: 2, activePartners: 1 },
    { id: 2, totalPartners: 5, activePartners: 3 },
    { id: 3, totalPartners: 3, activePartners: 2 },
    { id: 4, totalPartners: 2, activePartners: 2 },
  ];
  const chapData = [
    { id: 1, totalPartners: 2, activePartners: 1 },
    { id: 2, totalPartners: 5, activePartners: 3 },
    { id: 3, totalPartners: 3, activePartners: 2 },
    { id: 4, totalPartners: 2, activePartners: 2 },
    { id: 5, totalPartners: 2, activePartners: 1 },
    { id: 6, totalPartners: 5, activePartners: 3 },
    { id: 7, totalPartners: 3, activePartners: 2 },
    { id: 8, totalPartners: 2, activePartners: 2 },
  ];
  const ongData = [
    { id: 1, totalPartners: 2, activePartners: 1 },
    { id: 2, totalPartners: 5, activePartners: 3 },
    { id: 3, totalPartners: 3, activePartners: 2 },
    { id: 4, totalPartners: 2, activePartners: 2 },
    { id: 5, totalPartners: 2, activePartners: 1 },
    { id: 6, totalPartners: 5, activePartners: 3 },
  ];

  return (
    <div>
      <div className="flex space-x-4 mt-6 ml-[30px]">
        <button
          onClick={() => setActiveTab(1)}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            activeTab === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Umumiy
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            activeTab === 2
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Chap Tomon
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            activeTab === 3
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          O'ng tomon
        </button>
        <button
          onClick={() => setActiveTab(4)}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            activeTab === 4
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Diagramma
        </button>
        <button
          onClick={() => setActiveTab(5)}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            activeTab === 5
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Ro'yhat
        </button>
      </div>

      {activeTab === 1 && (
        <General title={" Ҳамкорлар ва актив ҳамкорлар"} data={general} />
      )}
      {activeTab === 2 && <General title={"Chap Tomon"} data={chapData} />}
      {activeTab === 3 && <General title={"O'ng Tomon"} data={ongData} />}
      {activeTab === 4 && <></>}
      {activeTab === 5 && <></>}
    </div>
  );
};

export default Stats;
