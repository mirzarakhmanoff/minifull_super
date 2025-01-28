"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Bonus() {
  const bonuses = [
    {
      id: 1,
      amount: "$45",
      reason: "0002507 (test test)",
      date: "2025-01-05 18:28:47",
    },
    {
      id: 2,
      amount: "$30",
      reason: "0002507 (test test)",
      date: "2025-01-05 18:27:42",
    },
    {
      id: 3,
      amount: "$45",
      reason: "0000000 (Admin Admin)",
      date: "2025-01-05 18:22:24",
    },
    {
      id: 4,
      amount: "$45",
      reason: "0000000 (Admin Admin)",
      date: "2025-01-05 18:21:40",
    },
    {
      id: 5,
      amount: "$45",
      reason: "0005430 (teste tetstet)",
      date: "2025-01-05 18:13:36",
    },
    {
      id: 6,
      amount: "$45",
      reason: "0002722 (test test)",
      date: "2025-01-05 18:11:08",
    },
    {
      id: 7,
      amount: "$15",
      reason: "0005540 (testtt testtt)",
      date: "2025-01-05 18:07:33",
    },
    {
      id: 8,
      amount: "$45",
      reason: "0005540 (testtt testtt)",
      date: "2025-01-05 18:06:51",
    },
    {
      id: 9,
      amount: "$15",
      reason: "0005539 (test test)",
      date: "2025-01-05 18:01:37",
    },
    {
      id: 10,
      amount: "$45",
      reason: "0005539 (test test)",
      date: "2025-01-05 18:00:51",
    },
    {
      id: 11,
      amount: "$45",
      reason: "0005430 (teste tetstet)",
      date: "2025-01-05 17:57:56",
    },
    {
      id: 12,
      amount: "$45",
      reason: "0005427 (test teste)",
      date: "2025-01-05 17:41:34",
    },
    {
      id: 13,
      amount: "$45",
      reason: "0004223 (TESTE TETSTE)",
      date: "2025-01-05 17:38:39",
    },
  ];

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">
        Ro‘yxatdan o‘tish uchun bonuslar
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">№</TableHead>
            <TableHead>Hisob</TableHead>
            <TableHead>Sabab</TableHead>
            <TableHead className="text-right">Qo‘shilgan sana</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bonuses.map((bonus) => (
            <TableRow key={bonus.id}>
              <TableCell>{bonus.id}</TableCell>
              <TableCell>{bonus.amount}</TableCell>
              <TableCell>{bonus.reason}</TableCell>
              <TableCell className="text-right">{bonus.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
