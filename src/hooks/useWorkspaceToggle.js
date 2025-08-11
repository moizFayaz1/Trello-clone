import { useState } from "react";

export const useWorkspaceToggle = (initialState = true) => {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const toggle = () => setIsExpanded(!isExpanded);
  return { isWorkspaceExpanded: isExpanded, toggleWorkspace: toggle };
};