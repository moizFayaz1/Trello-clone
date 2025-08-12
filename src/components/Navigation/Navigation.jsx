import { useBoardCreationModals } from "@hooks/useBoardCreationModals";
import CreateBoardModal from "@components/modals/CreateBoardModal";
import AccountPanel from "@components/account/AccountPanel";
import { NAVIGATION_ITEMS } from "@/data/NavItemsList";
import { Avatar } from "@components/ui/elements/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getInitials } from "@/utils/getInitials";
import { ROUTES } from "@/utils/util.constant";
import { debounce } from "@/utils/debounce";
import DESIGN_TOKENS from "@/styles/tokens";
import { userSlug } from "@/utils/slugify";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navigation = () => {
  const dispatch = useDispatch();
  const {
    modalState,
    openModal,
    closeAllModals,
    handleBackgroundSelect,
    setOpenedFrom,
  } = useBoardCreationModals();
  const [togglePanelOpen, setTogglePanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { boards } = useSelector((state) => state.boards);
  const { currentUser } = useSelector((state) => state.auth);

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
          setSearchResults([]);
          return;
        }

        const results = boards.filter((board) =>
          board.title.toLowerCase().includes(trimmedQuery.toLowerCase())
        );
        setSearchResults(results);
      }, 300),
    [boards]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // const intials = getInitials("MoizFayaz")

  // console.log(intials)

  return (
    <>
      <div
        className={`${DESIGN_TOKENS.colors.surface} gap-4 px-4 py-2 ${DESIGN_TOKENS.layout.flexBetween} ${DESIGN_TOKENS.colors.border}  relative border-b `}
      >
        <Link to={ROUTES.DASHBOARD(userSlug(currentUser.username))}>
          <div className={`${DESIGN_TOKENS.layout.flexCenter} space-x-4`}>
            <div className="trello-logo">
              <span className="line first-line"></span>
              <span className="line second-line"></span>
            </div>
          </div>
        </Link>

        <div className="relative w-[80%]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className={`bg-gray-700 text-white pl-10 w-full pr-4 py-1.5  text-sm ${DESIGN_TOKENS.interactive.input}`}
          />

          {searchQuery && (
            <div
              className={`w-full h-fit absolute py-1 z-90 inset-0 mt-10 ${DESIGN_TOKENS.colors.border} border ${DESIGN_TOKENS.colors.overlay}`}
            >
              {searchResults?.length > 0 ? (
                searchResults.map((board) => (
                  <div
                    key={board.id}
                    className="flex px-3 justify-start items-center gap-2 py-2 hover:bg-gray-500/40 transition-colors cursor-pointer"
                  >
                    {board?.background_image_url ? (
                      <img
                        src={board.background_image_url.thumb}
                        alt=""
                        className="h-8 w-12 rounded"
                      />
                    ) : (
                      <div
                        className="h-8 w-12"
                        style={{ backgroundColor: board.background_color }}
                      ></div>
                    )}
                    <div>
                      <p className="text-sm">{board.title}</p>
                      <p className="text-xs">Private Workspace</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Search Results Not Found.
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`${DESIGN_TOKENS.layout.flexCenter} space-x-3`}>
          <button
            onClick={() => {
              openModal("createBoard");
              dispatch(setOpenedFrom("navigation"));
            }}
            className={`${DESIGN_TOKENS.colors.primary} px-3 py-1.5 text-sm font-medium ${DESIGN_TOKENS.interactive.button} text-black `}
          >
            Create
          </button>

          <div className={`${DESIGN_TOKENS.layout.flexCenter} space-x-2 `}>
            {NAVIGATION_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="cursor-pointer rounded transition-colors hover:bg-gray-500 p-2"
                  onClick={
                    item.isAvatar
                      ? () => setTogglePanelOpen(!togglePanelOpen)
                      : undefined
                  }
                >
                  {item.isAvatar ? (
                    <Avatar>{getInitials(currentUser.username)}</Avatar>
                  ) : (
                    <Icon className="w-[20px] h-[20px]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <AccountPanel isOpen={togglePanelOpen} user={currentUser} />
      </div>

      <CreateBoardModal
        isOpen={modalState.createBoard}
        onClose={() => closeAllModals("createBoard")}
        onSelect={handleBackgroundSelect}
      />
    </>
  );
};

export default Navigation;
