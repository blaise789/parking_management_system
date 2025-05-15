// SideBar.tsx
import { Home, ParkingSquare, Users, Settings, User, CalendarClock, BarChart2 } from 'lucide-react'
import React from 'react'
import NavItem from './NavItem'

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
        <NavItem icon={<Home size={20} className="text-blue-200" />} label="Dashboard" active={true} />
        <NavItem icon={<ParkingSquare size={20} className="text-blue-200" />} label="Parking Spaces" />
        <NavItem icon={<Users size={20} className="text-blue-200" />} label="Customers" />
        <NavItem icon={<CalendarClock size={20} className="text-blue-200" />} label="Reservations" />
        <NavItem icon={<BarChart2 size={20} className="text-blue-200" />} label="Reports" />
      </nav>
      
      {/* Bottom navigation */}
      <div className="px-4 pb-6 space-y-1">
        <NavItem icon={<Settings size={20} className="text-blue-200" />} label="Settings" />
        <NavItem icon={<User size={20} className="text-blue-200" />} label="My Account" />
      </div>
    </div>
  );
};

export default SideBar;