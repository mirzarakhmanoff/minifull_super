import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function History() {
  const translations = [
    { id: 1, amount: 2, recipient: "0000203", date: "2024-11-10 12:32:45" },
    { id: 2, amount: 1, recipient: "0000203", date: "2024-11-10 12:30:57" },
    { id: 3, amount: 1, recipient: "0000203", date: "2024-09-12 17:03:03" },
    { id: 4, amount: 1, recipient: "0000203", date: "2024-09-12 14:53:43" },
    { id: 5, amount: 1, recipient: "0000203", date: "2024-09-09 16:12:54" },
    { id: 6, amount: 12, recipient: "0000203", date: "2024-07-12 04:50:32" },
    { id: 7, amount: 12, recipient: "0000203", date: "2024-07-11 18:35:29" },
    { id: 8, amount: 11, recipient: "0000203", date: "2024-07-11 18:32:37" },
    { id: 9, amount: 10, recipient: "0000203", date: "2024-07-11 18:04:06" },
  ];

  return (
    <div className="w-full  mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">История переводов</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">№</TableHead>
            <TableHead>Счет</TableHead>
            <TableHead>Кимга</TableHead>
            <TableHead className="text-right">Дата присоединения</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {translations.map((translation) => (
            <TableRow key={translation.id}>
              <TableCell>{translation.id}</TableCell>
              <TableCell>${translation.amount}</TableCell>
              <TableCell>{translation.recipient}</TableCell>
              <TableCell className="text-right">{translation.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
