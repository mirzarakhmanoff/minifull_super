"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const mockPayments = [
      {
        _id: "1",
        customer_id: "C123",
        user_id: { name: "John Doe" },
        price: 100,
        payment_type: "payme",
        status: "pending",
      },
      {
        _id: "2",
        customer_id: "C124",
        user_id: { name: "Jane Smith" },
        price: 200,
        payment_type: "manual",
        status: "pending",
      },
      {
        _id: "3",
        customer_id: "C125",
        user_id: { name: "Alice Johnson" },
        price: 150,
        payment_type: "cabinet",
        status: "pending",
      },
    ];

    setPayments(mockPayments);
  }, []);

  const handleUpdateStatus = (paymentId, status) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment._id === paymentId ? { ...payment, status } : payment
      )
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Payments</h1>
      <Table className="shadow-lg rounded-lg bg-white overflow-hidden">
        <TableHeader className=" text-white">
          <TableRow>
            <TableHead className="px-6 py-3 text-left">Customer ID</TableHead>
            <TableHead className="px-6 py-3 text-left">User</TableHead>
            <TableHead className="px-6 py-3 text-left">Price</TableHead>
            <TableHead className="px-6 py-3 text-left">Payment Type</TableHead>
            <TableHead className="px-6 py-3 text-left">Status</TableHead>
            <TableHead className="px-6 py-3 text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow
              key={payment._id}
              className="hover:bg-gray-100 transition-all duration-200"
            >
              <TableCell className="px-6 py-4 text-gray-700">
                {payment.customer_id}
              </TableCell>
              <TableCell className="px-6 py-4 text-gray-700">
                {payment.user_id.name}
              </TableCell>
              <TableCell className="px-6 py-4 text-gray-700">
                ${payment.price}
              </TableCell>
              <TableCell className="px-6 py-4 text-gray-700">
                {payment.payment_type}
              </TableCell>
              <TableCell className="px-6 py-4 text-gray-700">
                {payment.status || "Pending"}
              </TableCell>
              <TableCell className="px-6 py-4 flex gap-2 justify-center">
                <Button
                  onClick={() => handleUpdateStatus(payment._id, "confirmed")}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(payment._id, "rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
