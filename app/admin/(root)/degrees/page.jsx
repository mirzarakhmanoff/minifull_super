"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import avatar from "../../../public/avatar.jpg";

export default function Degrees() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    const mockDegrees = [
      {
        name: "Менеджер",
        image: avatar,
        min_pv: 100,
        prize_name: "Базовый приз",
        sort_number: 1,
        min_required_mb: 10,
      },
      {
        name: "Турист",
        image: avatar,
        min_pv: 200,
        prize_name: "Туристический приз",
        sort_number: 2,
        min_required_mb: 20,
      },
      {
        name: "Турист Мастер",
        image: avatar,
        min_pv: 300,
        prize_name: "Мастерский приз",
        sort_number: 3,
        min_required_mb: 30,
      },
      {
        name: "Серебро",
        image: avatar,
        min_pv: 400,
        prize_name: "Серебряный приз",
        sort_number: 4,
        min_required_mb: 40,
      },
      {
        name: "Золото",
        image: avatar,
        min_pv: 500,
        prize_name: "Золотой приз",
        sort_number: 5,
        min_required_mb: 100,
      },
      {
        name: "Платина",
        image: avatar,
        min_pv: 600,
        prize_name: "Платиновый приз",
        sort_number: 6,
        min_required_mb: 200,
      },
      {
        name: "Титан",
        image: avatar,
        min_pv: 700,
        prize_name: "Титановый приз",
        sort_number: 7,
        min_required_mb: 300,
      },
      {
        name: "Рубин",
        image: avatar,
        min_pv: 800,
        prize_name: "Рубиновый приз",
        sort_number: 8,
        min_required_mb: 400,
      },
      {
        name: "Изумруд",
        image: avatar,
        min_pv: 900,
        prize_name: "Изумрудный приз",
        sort_number: 9,
        min_required_mb: 500,
      },
      {
        name: "Бриллиант",
        image: avatar,
        min_pv: 1000,
        prize_name: "Бриллиантовый приз",
        sort_number: 10,
        min_required_mb: 600,
      },
      {
        name: "Посол",
        image: avatar,
        min_pv: 1100,
        prize_name: "Посольский приз",
        sort_number: 11,
        min_required_mb: 700,
      },
    ];

    setDegrees(mockDegrees);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Условия получения степеней
      </h1>

      <Table className="border rounded-lg shadow-md">
        <TableHeader>
          <TableRow>
            <TableHead>Степень</TableHead>
            <TableHead>Приз</TableHead>
            <TableHead>Минимум PV</TableHead>
            <TableHead>Минимум MB</TableHead>
            <TableHead>Сортировка</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {degrees.map((degree, index) => (
            <TableRow key={index} className="border-t">
              <TableCell className="flex items-center">
                <Image
                  src={degree.image}
                  alt={degree.name}
                  width={30}
                  height={30}
                  className="mr-2 rounded-full"
                />
                {degree.name}
              </TableCell>
              <TableCell>{degree.prize_name}</TableCell>
              <TableCell>{degree.min_pv}</TableCell>
              <TableCell>{degree.min_required_mb} MB</TableCell>
              <TableCell>{degree.sort_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
