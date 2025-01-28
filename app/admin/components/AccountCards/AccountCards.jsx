"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Import Lucide loader spinner icon
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa"; // Import icons from react-icons

export default function AccountCards() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users");
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Calculate total, active, and inactive users
  const totalUsers = usersData.length;
  const activeUsers = usersData.filter((user) => user.is_active).length;
  const inactiveUsers = usersData.filter((user) => !user.is_active).length;

  const cardData = [
    {
      id: 1,
      title: "Umumiy Foydalanuvchilar",
      value: loading ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        totalUsers
      ),
      backgroundColor: "bg-blue-500",
      icon: <FaUsers className="text-black" />,
    },
    {
      id: 2,
      title: "Aktiv Foydalanuvchilar",
      value: loading ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        activeUsers
      ),
      backgroundColor: "bg-green-500",
      icon: <FaUserCheck className="text-black" />,
    },
    {
      id: 3,
      title: "NoAktiv Foydalanuvchilar",
      value: loading ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        inactiveUsers
      ),
      backgroundColor: "bg-red-500",
      icon: <FaUserTimes className="text-black" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {cardData.map((card) => (
          <Card
            key={card.id}
            className={`rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300 ${card.backgroundColor} text-black`}
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
