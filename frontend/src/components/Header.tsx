import { Bell, Search } from "lucide-react";
import Prof from "@/assets/prof.jpg";
interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 flex justify-between items-center  border-b sticky top-0 z-10">
      <div></div>

      {/* Right side - search and profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search bar - appears only on medium+ screens */}

        {/* Mobile search icon (only on small screens) */}
        <button className="sm:hidden">
          <Search size={20} className="text-gray-400" />
        </button>

        {/* Notification (hidden on small screens) */}
        <div className="hidden sm:block relative mr-2 md:mr-4">
          <Bell size={24} className="text-gray-400" />
          <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
        </div>

        {/* Profile section */}
        <div className="flex items-center">
          {/* Name (hidden on small screens) */}
          <span className="hidden sm:block text-sm md:text-base mr-2">
            {name}
          </span>

          {/* Profile picture - smaller on mobile */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-300 rounded-full overflow-hidden">
            <img
              src={Prof}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
