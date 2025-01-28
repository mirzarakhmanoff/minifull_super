"use client";
import React, { useState } from "react";
import { mockData } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const PeopleTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockData.filter(
    (person) =>
      person.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.registerDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.paymentTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Mening jamoam
      </h1>

      {/* Qidiruv maydoni */}
      <div className="w-full max-w-screen-xl mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // qidiruv qiymatini yangilash
          placeholder="F.I.O., ID yoki boshqa ma'lumotlar bo'yicha qidiruv..."
          className="mb-4"
        />
      </div>

      <div className="overflow-x-auto w-full max-w-screen-xl shadow-md rounded-lg">
        <Table className="bg-white rounded-lg">
          <TableHeader className="bg-black">
            <TableRow>
              <TableHead className="text-left text-white">№</TableHead>
              <TableHead className="text-left text-white">F.I.O.</TableHead>
              <TableHead className="text-left text-white">ID</TableHead>
              <TableHead className="text-left text-white">Lavozim</TableHead>
              <TableHead className="text-left text-white">Balans</TableHead>
              <TableHead className="text-left text-white">Holat</TableHead>
              <TableHead className="text-left text-white">
                Ro‘yxatga olingan sana
              </TableHead>
              <TableHead className="text-left text-white">
                To'lov vaqti
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((person, index) => (
              <TableRow
                key={person.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-100 transition-colors duration-300`}
              >
                <TableCell className="text-center font-medium">
                  {person.id}
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {person.fullName}
                </TableCell>
                <TableCell className="text-gray-700">{person.userId}</TableCell>
                <TableCell className="text-gray-700">{person.title}</TableCell>
                <TableCell className="text-gray-700">
                  {person.balance} so‘m
                </TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      person.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {person.status === "Active" ? "Faol" : "Faol emas"}
                  </span>
                </TableCell>
                <TableCell className="text-gray-700">
                  {person.registerDate}
                </TableCell>
                <TableCell className="text-gray-700">
                  {person.paymentTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PeopleTable;
