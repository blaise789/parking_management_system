// pages/index.tsx
import React from "react";
import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/SideBar";
import { CommonContext } from "@/context/CommonContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParkingSquare, Users, CalendarClock, Car } from "lucide-react";

const Dashboard = () => {
  const { user } = React.useContext(CommonContext);
  
 
  // Admin Dashboard Stats
  const adminStats = [
    {
      title: "Total Parking Slots",
      value: "85",
      trend: "+5 this week",
      icon: <ParkingSquare className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Active Reservations",
      value: "24",
      trend: "+2 this week",
      icon: <CalendarClock className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Registered Vehicles",
      value: "142",
      trend: "+8 this week",
      icon: <Car className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Active Users",
      value: "68",
      trend: "+2 today",
      icon: <Users className="h-6 w-6 text-yellow-600" />,
    },
  ];

  // User Dashboard Stats
  const userStats = [
    {
      title: "My Vehicles",
      value: "3",
    },
    {
      title: "My reservations",
      value: "1",
    },
  ];

  const stats = user?.user.role === "ADMIN" ? adminStats : userStats;

  const recentReservations = [
    {
      user: "John Doe",
      vehicle: "ABC123 (Car)",
      status: "Approved",
      date: "10/08/2023",
      slot: "SQ05 South",
    },
    {
      user: "Jane Smith",
      vehicle: "XYZ789 (Motorcycle)",
      status: "Pending",
      date: "15/08/2023",
      slot: "Selecting",
    },
    {
      user: "Mike Johnson",
      vehicle: "DEF456 (Truck)",
      status: "Approved",
      date: "20/07/2023",
      slot: "SQ12 East",
    },
  ];

  const userRecentReservations = recentReservations.filter(
    (res) => res.user === user?.name
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden md:block md:w-64 flex-shrink-0">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header name={user?.name || "User"} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {user?.user.role === "ADMIN" ? "Admin Dashboard" : "My Dashboard"}
            </h1>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white shadow-sm rounded-xl">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Reservations */}
            <Card className="bg-white shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {user.user?.role === "ADMIN"
                    ? "Recent Reservations"
                    : "My Recent Reservations"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {user?.user.role === "ADMIN" && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Parking Slot
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(user?.user.role === "ADMIN"
                        ? recentReservations
                        : userRecentReservations
                      ).map((res, index) => (
                        <tr key={index}>
                          {user?.role === "ADMIN" && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {res.user}
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {res.vehicle}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                res.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : res.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {res.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {res.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {res.slot}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Parking Slot Status - Only for Admin */}
            {user?.role === "ADMIN" && (
              <Card className="bg-white shadow-sm rounded-xl mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Parking Slot Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        North Section
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Available</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Occupied</span>
                          <span className="font-medium">8</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        South Section
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Available</span>
                          <span className="font-medium">15</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Occupied</span>
                          <span className="font-medium">5</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        East Section
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Available</span>
                          <span className="font-medium">10</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Occupied</span>
                          <span className="font-medium">10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
