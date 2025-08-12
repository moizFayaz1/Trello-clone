import React from "react";
import { Avatar } from "../ui/elements/Avatar";
import { getInitials } from "@/utils/getInitials";

const UserProfile = ({ user }) => {
  return (
    <div className="flex items-center mb-4 px-4 pt-2">
      <Avatar size={"w-8 h-8"} className="mr-3">
        {getInitials(user.username)}
      </Avatar>
      <div>
        <div className="text-white font-medium">{user.username}</div>
        <div className="text-slate-400 text-xs">{user.email}</div>
      </div>
    </div>
  );
};

export default UserProfile;
