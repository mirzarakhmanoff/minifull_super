"use client";

import React from "react";

export default function PartnerTable({ title, data }) {
  const totals = data.reduce(
    (acc, item) => {
      acc.totalPartners += item.totalPartners;
      acc.activePartners += item.activePartners;
      return acc;
    },
    { totalPartners: 0, activePartners: 0 }
  );

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Ҳамкорлар ва актив ҳамкорлар
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            <th className="w-16 text-left px-4 py-3 font-semibold text-sm">
              №
            </th>
            <th className="text-left px-4 py-3 font-semibold text-sm">
              Ҳамкорлар сони
            </th>
            <th className="text-left px-4 py-3 font-semibold text-sm">
              Актив ҳамкорлар сони
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-blue-50 transition-colors duration-300"
            >
              <td className="px-4 py-3">{row.id}</td>
              <td className="px-4 py-3">{row.totalPartners}</td>
              <td className="px-4 py-3">{row.activePartners}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold bg-gray-200">
            <td className="px-4 py-3">Жами:</td>
            <td className="px-4 py-3">{totals.totalPartners}</td>
            <td className="px-4 py-3">{totals.activePartners}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
