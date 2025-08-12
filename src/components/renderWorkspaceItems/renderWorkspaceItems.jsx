
import { WORKSPACE_ITEMS } from "@/data/WorkspaceItems";
import { NavItem } from "../NavItem/NavItem";

export const renderWorkspaceItems = () =>
  WORKSPACE_ITEMS.map((item) => (
    <NavItem
      key={item.id}
      icon={item.icon}
      active={item.active}
      rightElement={item.rightElement}
      arrowElement={item.arrowElement}
    >
      {item.label} 
    </NavItem>
  ));
