import { Bell, HelpCircle, Search } from "lucide-react";
import { IconButton } from "../IconButton/IconButton";
import DESIGN_TOKENS from "@/styles/tokens";
import { Avatar } from "../Avatar/Avatar";
import { useBoardCreationModals } from "@/hooks/useBoardCreationModals";
import CreateBoardModal from "../modals/CreateBoardModal";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/util.constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "@/utils/debounce";

const Navigation = () => {
    const dispatch = useDispatch();
  const {
    modalState,
    openModal,
    closeAllModals,
    handleBackgroundSelect,
    setOpenedFrom,
  } = useBoardCreationModals();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { boards } = useSelector((state) => state.boards);

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
      }, 500),
    [boards]
  );


  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  console.log(searchResults, "Search");


  return (
    <>
      <div
        className={`${DESIGN_TOKENS.colors.surface} gap-4 px-4 py-2 ${DESIGN_TOKENS.layout.flexBetween} ${DESIGN_TOKENS.colors.border}  relative border-b `}
      >
        <Link to={ROUTES.DASHBOARD("moizFayaz")}>
          <div className={`${DESIGN_TOKENS.layout.flexCenter} space-x-4`}>
            <div className="trello-logo">
              <span className="line first-line"></span>
              <span className="line second-line"></span>
            </div>
          </div>
        </Link>

        {/* <Trello className="w-4 h-4 text-white" /> */}

        <div className="relative w-[80%]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className={`bg-gray-700 text-white pl-10 w-full pr-4 py-1.5  text-sm ${DESIGN_TOKENS.interactive.input}`}
          />
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
          <div className={`${DESIGN_TOKENS.layout.flexCenter} space-x-2`}>
            {/* <Avatar className="bg-red-600 text-xs" size="w-6 h-6">8</Avatar> */}
            <IconButton
              icon={Bell}
              className="text-gray-300 hover:text-white hover:bg-gray-500 p-2"
            />
            <IconButton
              icon={HelpCircle}
              className="text-gray-300 hover:text-white hover:bg-gray-500 p-2"
            />
            <Avatar className="bg-orange-500 text-white text-sm font-bold cursor-pointer">
              MC
            </Avatar>
          </div>
        </div>
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
