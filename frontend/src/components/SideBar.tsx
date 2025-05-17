// SideBar.tsx
import { logout } from '@/redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import { CalendarClock, Car, Home, LogOut, ParkingSquare, Users } from 'lucide-react';

const SideBar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

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
        <Link to="/">
          <NavItem 
            icon={<Home size={20} className="text-blue-200" />} 
            label="Dashboard" 
            active={location.pathname === '/'}
          />
        </Link>
        <Link to="/parking-slots">
          <NavItem
            icon={<ParkingSquare size={20} className="text-blue-200" />}
            label="Parking Slots"
            active={location.pathname === '/parking-slots'}
          />
        </Link>
        <Link to="/vehicles">
          <NavItem
            icon={<Car size={20} className="text-blue-200" />}
            label="Vehicles"
            active={location.pathname === '/vehicles'}
          />
        </Link>
        <Link to="/drivers">
          <NavItem
            icon={<Users size={20} className="text-blue-200" />}
            label="drivers"
            active={location.pathname === '/drivers'}
          />
        </Link>
        <Link to="/reservations">
          <NavItem
            icon={<CalendarClock size={20} className="text-blue-200" />}
            label="Reservations"
            active={location.pathname === '/reservations'}
          />
        </Link>
      </nav>

      {/* Bottom navigation */}
      <div className="px-4 pb-6 space-y-1" onClick={handleLogout}>
        <NavItem
          icon={<LogOut size={16} className="text-blue-200" />}
          label="LogOut"
        />
      </div>
    </div>
  );
};

export default SideBar;