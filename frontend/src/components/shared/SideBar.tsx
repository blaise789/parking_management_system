import { logout } from '@/redux/features/UserSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavItem from '../ui/NavItem';
import { CalendarClock, Car, Home, LogOut, ParkingSquare, Settings, Users } from 'lucide-react';
// import { useAppSelector } from '@/redux/hooks';
import { useContext } from 'react';
import { CommonContext } from '@/context/CommonContext';

const SideBar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useContext(CommonContext)

  const handleLogout = () => {
    dispatch(logout());
  };

  // Common items for all users
  const commonItems = [
    { name: 'Dashboard', icon: <Home size={20} className="text-blue-200" />, path: '/' },
    { name: 'My Vehicles', icon: <Car size={20} className="text-blue-200" />, path: '/vehicles' },
    { name: 'My Reservations', icon: <CalendarClock size={20} className="text-blue-200" />, path: '/reservations' },
  ];

  // Admin-only items
  const adminItems = [
    { name: 'Parking Slots', icon: <ParkingSquare size={20} className="text-blue-200" />, path: '/parking-slots' },
    { name: 'Users', icon: <Users size={20} className="text-blue-200" />, path: '/users' },
  ];

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
        {/* Common Navigation Items */}
        {commonItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <NavItem
              icon={item.icon}
              label={item.name}
              active={location.pathname === item.path}
            />
          </Link>
        ))}
        
        {/* Admin Navigation Items */}
        {user?.user.role === 'ADMIN' && adminItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <NavItem
              icon={item.icon}
              label={item.name}
              active={location.pathname === item.path}
            />
          </Link>
        ))}
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