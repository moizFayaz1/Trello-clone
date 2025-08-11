import {
    Activity,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Crown,
  Plus,
  Settings,
  SquareKanban,
  Users,
} from "lucide-react";
import React, { useState } from "react";

const CustomDropDown = () => {
  const [isWorkspaceExpanded, setIsWorkspaceExpanded] = useState(true);
  return (
    <>
      <nav className="flex-1">

        <div className="mb-4">
          <div className="text-xs text-gray-400  mb-2">Workspaces</div>

          {/* Team Co. Workspace */}
          <div className="mb-2">
            <div
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => setIsWorkspaceExpanded(!isWorkspaceExpanded)}
            >
              <Crown className="w-4 h-4 mr-2 text-yellow-500" />
              <span className="text-sm flex-1">Team Co.</span>
              {isWorkspaceExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>

            {/* Expanded workspace items */}
            {isWorkspaceExpanded && (
              <div className="ml-6 mt-2 ">
                <div className="flex items-center px-3 py-2 text-[#579DFF] bg-[#1C2B41] rounded-lg cursor-pointer mb-1">
                  <div className="rounded-sm mr-3">
                  <SquareKanban className="w-4 h-4 ml-auto text-white" />
                  </div>
                  <span className="text-sm">Boards</span>
                </div>

                <div className="flex items-center px-3 py-2 text-gray-300  hover:bg-gray-700 rounded-lg cursor-pointer mb-1">
                  <Users className="w-4 h-4 mr-3" />
                  <span className="text-sm">Members</span>
                  <Plus className="w-4 h-4 ml-auto " />
                </div>

                <div className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer">
                  <Activity  className="w-4 h-4 mr-3" />
                  <span className="text-sm">Activity</span>
                </div>

                <div className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer">
                  <Settings className="w-4 h-4 mr-3" />
                  <span className="text-sm">Settings</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default CustomDropDown;
