import Divider from "@components/ui/elements/Divider";
import AccountMenuItem from "./AccountMenuItem";
import DESIGN_TOKENS from "@/styles/tokens";
import { ExternalLink } from "lucide-react";
import UserProfile from "./UserProfile";
import {
  ACCOUNT_MENU_ITEMS,
  BOTTOM_MENU_ITEMS,
  TRELLO_MENU_ITEMS,
} from "@/data/account-menu-list";
import { useDispatch } from "react-redux";

export default function AccountPanel({ isOpen, user }) {
  const dispatch = useDispatch();
  // const {logout}  = useSelector((state) => state.auth)
  if (!isOpen) return;

  // console.log(logout)

  const panelClasses =
    `w-80 border py-1 rounded-lg  ${DESIGN_TOKENS.borders} z-99999999 absolute top-13 right-0  ${DESIGN_TOKENS.colors.overlay} text-[#a0abb7] font-medium text-sm account-panel `.trim();

  const headingClasses =
    "text-xs px-4 text-slate-400 font-semibold tracking-wider mb-3";

  return (
    <div className={panelClasses}>
      {/* Account Section */}
      <div className=" py-3 ">
        <div className={headingClasses}>ACCOUNT</div>

        <UserProfile user={user} />

        {ACCOUNT_MENU_ITEMS.map((item, index) => (
          <div className="relative" key={index}>
            <AccountMenuItem
              hasIcon={item.hasIcon}
              onClick={item.onClick}
            >
              {item.label}
            </AccountMenuItem>
            {item.hasIcon && (
              <ExternalLink className="w-4 h-4 absolute cursor-pointer top-1/2 right-5 transform -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>

      <Divider />

      <div className=" py-3 ">
        <div className={headingClasses}>TRELLO</div>

        {TRELLO_MENU_ITEMS.map((item, index) => (
          <div className="relative" key={index}>
            <AccountMenuItem
             
              onClick={item.onClick}
              hasChevron={item.hasChevron}
            >
              {item.label}
            </AccountMenuItem>
          </div>
        ))}
      </div>

      <Divider />

      <div className="space-y-1">
        {BOTTOM_MENU_ITEMS(dispatch).map((item, index) => (
          <div key={index}>
            <AccountMenuItem
              onClick={item.onClick}
              icon={item.icon}
              className={item.label === "Create Workspace" ? "my-1" : ""}
            >
              {item.label}
            </AccountMenuItem>
            {item.showDividerAfter && <Divider />}
          </div>
        ))}
      </div>
    </div>
  );
}
