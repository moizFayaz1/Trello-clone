import {
  Plus,
  Settings,
  Users,
  SquareKanban,
  ChevronRight,
} from "lucide-react";

export const WORKSPACE_ITEMS = [
  { id: "boards", label: "Boards", icon: SquareKanban, active: true },
  {
    id: "members",
    label: "Members",
    icon: Users,
    rightElement: <Plus className="w-4 h-4" />,
    arrowElement: <ChevronRight className="w-4 h-4 " />,
  },
  { id: "settings", label: "Settings", icon: Settings },
];
