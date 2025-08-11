import { NAVIGATION_ITEMS } from "@/data/NavItemsList";
import { NavItem } from "../NavItem/NavItem";
import { useState } from "react";

export const RenderNavItems = () => {
  const [activeItem, setActiveItem] = useState("boards"); 

  return NAVIGATION_ITEMS.map((item) => (
    <NavItem
      key={item.id}
      icon={
        item.icon ? (
          item.icon
        ) : (
          <div className="w-3 h-3 bg-gray-400 rounded-sm" />
        )
      }
      active={activeItem === item.id}
      onClick={() => setActiveItem(item.id)}
    >
      {item.label}
    </NavItem>
  ));
};
