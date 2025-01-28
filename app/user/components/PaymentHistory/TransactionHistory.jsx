"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Receipt, RotateCcw, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { transactions } from "@/lib/utils";

const StatusBadge = ({ type, status }) => {
  const styles = {
    returned: { bg: "bg-yellow-100 text-yellow-800", icon: RotateCcw },
    paid: { bg: "bg-green-100 text-green-800", icon: CheckCircle2 },
    unpaid: { bg: "bg-red-100 text-red-800", icon: Receipt },
  }[type] || { bg: "bg-gray-100 text-gray-800", icon: Receipt };

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className={`font-medium ${styles.bg}`}>
        {status}
      </Badge>
      <div className="p-1 rounded-lg bg-blue-100">
        <styles.icon className="w-4 h-4 text-blue-700" />
      </div>
    </div>
  );
};

export default function TransactionHistory() {
  const [statusFilter, setStatusFilter] = useState(null);

  const filteredTransactions = transactions.filter((transaction) => {
    if (statusFilter === null) return true;
    return transactions.type === statusFilter;
  });

  const getStatusLabel = (status) => {
    switch (status) {
      case "unpaid":
        return "To'lanmagan";
      case "paid":
        return "To'langan";
      case "returned":
        return "Qaytarildi";
      default:
        return "Statusni tanlang";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Pulni chiqarish tarixi</h2>

      {/* Фильтрация по статусу */}
      <div className="mb-6">
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)} // Filter update
          className="w-48"
        >
          <SelectTrigger>
            <span>{getStatusLabel(statusFilter) || "Statusni tanlang"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>Hamma Statuslar</SelectItem>{" "}
            {/* Use null for "All Statuses" */}
            <SelectItem value="unpaid">To'lanmagan</SelectItem>
            <SelectItem value="paid">To'langan</SelectItem>
            <SelectItem value="returned">Qaytarildi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">№</TableHead>
              <TableHead>Hisob</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Qo'shilgan sana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  <StatusBadge
                    type={transaction.type}
                    status={transaction.status}
                  />
                </TableCell>
                <TableCell className="text-right">{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
