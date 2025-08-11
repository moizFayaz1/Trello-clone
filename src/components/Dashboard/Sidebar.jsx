import { renderWorkspaceItems } from "../renderWorkspaceItems/renderWorkspaceItems";
import { RenderNavItems } from "../renderNavItems/RenderNavItems";
import { useWorkspaceToggle } from "@/hooks/useWorkspaceToggle";
import { ChevronDown, ChevronUp, Crown } from "lucide-react";
import { NavItem } from "../NavItem/NavItem";
import DESIGN_TOKENS from "@/styles/tokens";

export default function Sidebar() {
  const { isWorkspaceExpanded, toggleWorkspace } = useWorkspaceToggle();

  return (
    <>
      <div
        className={`${DESIGN_TOKENS.layout.sidebar} py-6 pl-4 ${DESIGN_TOKENS.colors.surface} flex flex-col h-full`}
      >
        {/* Trello Logo */}

        {/* Navigation */}
        <nav className="flex-1 ">
          {RenderNavItems()}

          <div className="h-[1px] w-full bg-gray-700 my-4 "></div>

          {/* Workspaces */}
          <div className={`${DESIGN_TOKENS.spacing.item}`}>
            <div
              className={`${DESIGN_TOKENS.typography.body.small} ${DESIGN_TOKENS.colors.text.muted} ${DESIGN_TOKENS.typography.weight.bold} px-3 mb-2`}
            >
              Workspaces
            </div>

            <div className="mb-2 mt-4 ">
              <NavItem
                icon={Crown}
                onClick={toggleWorkspace}
                rightElement={
                  isWorkspaceExpanded ? (
                    <ChevronUp className={DESIGN_TOKENS.sizing.icon.medium} />
                  ) : (
                    <ChevronDown className={DESIGN_TOKENS.sizing.icon.medium} />
                  )
                }
              >
                <span className="font-semibold"> Team Co.</span>
              </NavItem>

              {isWorkspaceExpanded && (
                <div className="ml-6 mt-2">{renderWorkspaceItems()}</div>
              )}
            </div>
          </div>

          {/* Try Trello Premium */}
        </nav>
      </div>
    </>
  );
}
