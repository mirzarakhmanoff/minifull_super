import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCardData } from "@/lib/utils";

export default function AccountCards() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {mockCardData.map((card) => (
          <Card
            key={card.id}
            className={`rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300 ${card.backgroundColor} text-white`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-5">
                  <p className="text-lg font-medium">{card.title}</p>
                  <p className="text-4xl font-bold mt-2">{card.value}</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-800 rounded-full">
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
