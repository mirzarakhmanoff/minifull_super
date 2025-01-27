"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const mockData = [
  {
    id: 1,
    name: ". .",
    position: "Boshlang'ish",
    hisob: ". (0$)",
    status: "no",
    addedDate: "2024-04-04 14:01:07",
  },
  {
    id: 2,
    name: "Admin Admin",
    position: "Boshlang'ish",
    hisob: "0000000 (0$)",
    status: "active",
    addedDate: "2023-03-08 08:48:50",
  },
  {
    id: 3,
    name: "XJ BUSINESS",
    position: "Boshlang'ish",
    hisob: "0000002 (827$)",
    status: "active",
    addedDate: "2023-03-08 08:53:26",
  },
  {
    id: 4,
    name: "XJ CLUB",
    position: "Boshlang'ish",
    hisob: "0000003 (7316$)",
    status: "active",
    addedDate: "2023-03-08 08:54:32",
  },
  {
    id: 5,
    name: "xji business",
    position: "Boshlang'ish",
    hisob: "0000004 (486$)",
    status: "no",
    addedDate: "2023-03-08 09:10:58",
  },
  {
    id: 6,
    name: "xji business",
    position: "Boshlang'ish",
    hisob: "0000005 ($)",
    status: "active",
    addedDate: "2023-03-08 09:12:48",
  },
  {
    id: 7,
    name: "Nodira Shonazarova",
    position: "Boshlang'ish",
    hisob: "0000006 (75$)",
    status: "no",
    addedDate: "2023-03-08 09:16:31",
  },
];

export default function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hisob.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.addedDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <Input
        type="text"
        className="mb-4"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Hisob</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.hisob}</TableCell>
                <TableCell>
                  <span
                    className={`${
                      row.status === "active"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.addedDate}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
