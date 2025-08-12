import {
  Plus,
  Settings,
  Users,
  SquareKanban,
  ChevronRight,
  Earth,
  UsersRound,
  LockKeyhole,
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

 export const WISIBLITY_OPTIONS = [
    {
      value: "private",
      label: "Private",
      icon: LockKeyhole,
      description:
        "Only board members can see this board. Workspace admins can close the board or remove members.",
    },
    {
      value: "workspace",
      label: "Workspace",
      icon: UsersRound,
      description:
        "All members of the Team Co. Workspace can see and edit this board.",
      isSelected: true,
    },
    {
      value: "public",
      label: "Public",
      icon: Earth,
      description:
        "Anyone on the internet can see it. Only workspace members can edit.",
    },
  ];