import React from "react";
import {
  ChevronDown,
  Zap,
  Menu,
  Star,
  Users,
  Share,
  MoreHorizontal,
  Eye,
} from "lucide-react";

const Navigation = ({title}) => {
  return (
    <div className="bg-black/30 border-b  px-4 py-3 text-white">
      <div className="flex items-center justify-between">
        {/* Left section - Board title and visibility */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold ">{title}</h1>
            <button className="flex items-center space-x-1  hover:text-slate-800 transition-colors">
              <Eye className="w-4 h-4" />
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right section - Actions and user */}
        <div className="flex items-center space-x-2">
          {/* Power-up button */}
          <button className="flex items-center space-x-1 px-2 py-1.5  hover:bg-gray-200/30 cursor-pointer rounded transition-colors">
            <Zap className="w-4 h-4" />
          </button>

          {/* Automation button */}
          <button className="flex items-center space-x-1 px-2 py-1.5  hover:bg-gray-200/30 cursor-pointer rounded transition-colors">
            <div className="w-4 h-4 bg-slate-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-xs"></div>
            </div>
          </button>

          {/* Menu button */}
          <button className="flex items-center space-x-1 px-2 py-1.5  hover:bg-gray-200/30 cursor-pointer rounded transition-colors">
            <Menu className="w-4 h-4" />
          </button>

          {/* Star button */}
          <button className="flex items-center space-x-1 px-2 py-1.5  hover:bg-gray-200/30 cursor-pointer rounded transition-colors">
            <Star className="w-4 h-4" />
          </button>

          {/* Team button */}
          <button className="flex items-center space-x-1 px-2 py-1.5  hover:bg-gray-200/30 cursor-pointer rounded transition-colors">
            <Users className="w-4 h-4" />
          </button>

          {/* Share button */}
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors">
            <Share className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>

          {/* User avatar */}
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium ml-2">
            MF
          </div>

          {/* More options */}
          <button className="flex items-center space-x-1 px-2 py-1.5  hover:bg-gray-200/30 cursor-pointer rounded transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
