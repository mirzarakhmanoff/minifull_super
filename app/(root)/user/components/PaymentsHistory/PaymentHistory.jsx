import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PaymentHistory() {
  const translations = [
    { id: 1, amount: 24, date: "2023-12-01 11:16:16" },
    { id: 2, amount: 36, date: "2023-11-01 11:16:10" },
    { id: 3, amount: 36, date: "2023-10-01 11:16:12" },
    { id: 4, amount: 36, date: "2023-09-01 11:16:14" },
    { id: 5, amount: 36, date: "2023-08-01 11:16:14" },
    { id: 6, amount: 36, date: "2023-07-01 11:16:12" },
  ];

  return (
    <div className="w-full  mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">
        Ежемесячная история переводов
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">№</TableHead>
            <TableHead>Счет</TableHead>
            <TableHead>Дата присоединения</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {translations.map((translation) => (
            <TableRow key={translation.id}>
              <TableCell>{translation.id}</TableCell>
              <TableCell>${translation.amount}</TableCell>
              <TableCell>{translation.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
