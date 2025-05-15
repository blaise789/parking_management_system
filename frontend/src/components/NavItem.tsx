import React from "react";

 interface NavItemProps{
    icon:React.ReactNode,
    label:string,
    active?:boolean
 }
const NavItem = ({ icon, label, active }:NavItemProps) => (
    <div className={`flex items-center p-4 cursor-pointer ${active ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
      {icon}
      <span className="ml-3 text-white">{label}</span>
    </div>
  );
export default NavItem;