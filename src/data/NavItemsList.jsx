import {
  SquareKanban,
  FileText,
  Activity,
  Bell,
  HelpCircle,
} from "lucide-react";

export const SIDE_NAVIGATION_ITEMS = [
  { id: "boards", label: "Boards", icon: SquareKanban },
  { id: "templates", label: "Templates", icon: FileText },
  { id: "home", label: "Home", icon: Activity },
];

export const NAVIGATION_ITEMS = [
  { id: "bell", label: "Bell", icon: Bell },
  { id: "info", label: "Info", icon: HelpCircle },
  { id: "avatar", label: "Avatar", isAvatar: true },
];
