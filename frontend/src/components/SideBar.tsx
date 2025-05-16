// SideBar.tsx
import {
  ParkingSquare,
  Users,
  CalendarClock,
  LogOut,
} from "lucide-react";
import React from "react";
import NavItem from "./NavItem";

const SideBar: React.FC = () => {
  return (
    <div className="hidden md:flex md:w-64 bg-blue-800 flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-blue-300">Parking</span> MS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {/* <NavItem icon={<Home size={20} className="text-blue-200" />} label="Dashboard" active={true} /> */}
        <NavItem
          icon={<ParkingSquare size={20} className="text-blue-200" />}
          label="Parking Slots"
        />
        <NavItem
          icon={<Users size={20} className="text-blue-200" />}
          label="Customers"
        />
        <NavItem
          icon={<CalendarClock size={20} className="text-blue-200" />}
          label="Reservations"
        />
      </nav>

      {/* Bottom navigation */}
      <div className="px-4 pb-6 space-y-1">
        <NavItem
          icon={<LogOut size={16} className="text-blue-200" />}
          label="LogOut"
        />
      </div>
    </div>
  );
};

export default SideBar;
