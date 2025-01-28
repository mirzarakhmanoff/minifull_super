"use client";
import React, { useState } from "react";
import { data } from "../../../lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Degreetable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.personalPartners.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.activeRange.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lowNumberOfNetworkUsers.toString().includes(searchTerm) ||
      item.bonusAmount.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 w-full flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">Daraja Jadvali</h1>

      {/* Qidiruv qatori */}
      <div className="w-full max-w-screen-xl mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Qidiruv qiymatini yangilash
          placeholder="Ism, lavozim yoki boshqa maydonlar bo‘yicha qidiring..."
          className="mb-4"
        />
      </div>

      <div className="w-full max-w-screen-xl overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <Table className="bg-white rounded-lg text-sm">
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="py-3 px-4 text-left text-white">
                №
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-white">
                TO‘LIQ ISMI
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-white">
                LAVOZIM
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-white">
                SHAXSIY HAMKORLAR
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-white">
                FAOL ORALIQ
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-white">
                PASTKI TARMОQ FOYDALANUVCHILARI
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-white">
                BONUS MIQDORI
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-100 transition-colors duration-300`}
              >
                <TableCell className="px-4 py-3 text-center font-medium">
                  {item.id}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-800">
                  {item.fullName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700">
                  {item.title}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700">
                  {item.personalPartners}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700">
                  {item.activeRange}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700">
                  {item.lowNumberOfNetworkUsers}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700">
                  {item.bonusAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Degreetable;
