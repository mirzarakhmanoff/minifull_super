import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCardData } from "@/lib/utils";

export default function AccountCards() {
  return (
    <div className="p-6 space-y-6">
      {/* Top row */}
      <div className="grid gap-6 md:grid-cols-3">
        {mockCardData.slice(0, 3).map((card) => (
          <Card
            key={card.id}
            className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-600">
                    {card.title}
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">
                    {card.value}
                  </p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full">
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid gap-6 md:grid-cols-3">
        {mockCardData.slice(3).map((card) => (
          <Card
            key={card.id}
            className="rounded-lg border border-gray-100 bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <CardHeader className="p-6 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium text-gray-700">
                  {card.title}
                </CardTitle>
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                  {card.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-800">
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
