import { logout } from "@/features/auth/authSlice";
import { Layers } from "lucide-react";

export const ACCOUNT_MENU_ITEMS = [
  { label: "Switch accounts", onClick: () => console.log("Switch accounts") },
  {
    label: "Manage account",
    onClick: () => console.log("Manage account"),
    hasIcon: true,
  },
];

export const TRELLO_MENU_ITEMS = [
  { label: "Profile and visibility", onClick: () => console.log("Profile") },
  { label: "Activity", onClick: () => console.log("Activity") },
  { label: "Cards", onClick: () => console.log("Cards") },
  { label: "Settings", onClick: () => console.log("Settings") },
  {
    label: "Theme",
    onClick: () => console.log("Theme"),
    hasChevron: true,
  },
];

export const BOTTOM_MENU_ITEMS = (dispatch) => [
  {
    label: "Create Workspace",
    onClick: () => console.log("Create Workspace"),
    icon: <Layers className="w-4 h-4" />,
    showDividerAfter: true,
  },
  { label: "Help", onClick: () => console.log("Help") },
  {
    label: "Shortcuts",
    onClick: () => console.log("Shortcuts"),
    showDividerAfter: true,
  },
  { label: "Log out", onClick: () => dispatch(logout()) },
];
