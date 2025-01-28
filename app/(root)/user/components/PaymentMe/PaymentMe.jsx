"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PaymentMe() {
  const payments = [
    { id: 1, amount: "$5", sender: "0000003", date: "2024-08-01 15:48:53" },
    { id: 2, amount: "$4", sender: "0000003", date: "2024-07-13 19:28:51" },
    { id: 3, amount: "$100", sender: "0000133", date: "2023-12-16 17:16:25" },
    { id: 4, amount: "$40", sender: "0000133", date: "2023-12-16 17:08:17" },
    { id: 5, amount: "$30", sender: "0000133", date: "2023-12-16 17:07:31" },
    { id: 6, amount: "$10", sender: "0000133", date: "2023-12-16 17:05:03" },
    { id: 7, amount: "$100", sender: "0000133", date: "2023-12-16 17:04:04" },
    { id: 8, amount: "$12", sender: "0000133", date: "2023-12-16 16:39:44" },
    { id: 9, amount: "$100", sender: "0000133", date: "2023-12-16 16:32:42" },
    { id: 10, amount: "$1", sender: "0000003", date: "2023-11-06 19:59:04" },
    { id: 11, amount: "$10", sender: "0000003", date: "2023-07-06 12:40:41" },
    { id: 12, amount: "$1", sender: "0000006", date: "2023-06-16 20:14:17" },
  ];

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Menga o‘tkazmalar tarixi</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">№</TableHead>
            <TableHead>Hisob</TableHead>
            <TableHead>Kimdan</TableHead>
            <TableHead className="text-right">Qo‘shilgan sana</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.sender}</TableCell>
              <TableCell className="text-right">{payment.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
