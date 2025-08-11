import { useBoardCreationModals } from "@hooks/useBoardCreationModals";
import { BoardGrid } from "@components/boards/BoardGrid";
import { SectionTitle } from "@ui/elements/SectionTitle";
import usePageSeo from "@hooks/usePageSeo";
import DESIGN_TOKENS from "@/styles/tokens";
import { ShieldUser } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "@/features/boards/boardThunk";
import { useEffect } from "react";

const Dashboard = () => {
  usePageSeo("Boards");
  const { boards } = useSelector((state) => state.boards);
  const { openModal, setOpenedFrom } = useBoardCreationModals();
  const dispatch = useDispatch();

  const privateBoards = boards.filter(
    (board) => board.visibility !== "workspace"
  );

  const workspaceBoards = boards.filter(
    (board) => board.visibility === "workspace"
  );

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <div className="flex-1 flex flex-col px-6 py-6">
      <SectionTitle icon={ShieldUser}>Private Boards</SectionTitle>
      {privateBoards?.length < 0 ? (
        <div
          className="bg-[#A1BDD914] mb-15 h-24 w-40 px-2 py-4 flex flex-col justify-center items-center gap-1 hover:opacity-100 opacity-80  transition-opacity rounded-lg cursor-pointer "
          onClick={() => {
            openModal("createBoard");
            dispatch(setOpenedFrom("dashboard"));
          }}
        >
          <p className="text-sm text-white/70">Create New Board</p>
          <p className="text-xs text-whilte/70">10 remaining</p>
        </div>
      ) : (
        <div className="mb-15">
          <div className={DESIGN_TOKENS.layout.grid}>
            <BoardGrid boards={privateBoards} />
          </div>
        </div>
      )}

      <div>
        <SectionTitle>YOUR WORKSPACES</SectionTitle>
        {workspaceBoards?.length < 0 ? (
          <div
            className="bg-[#A1BDD914] mb-15 h-24 w-40 px-2 py-4 flex flex-col justify-center items-center gap-1 hover:opacity-100 opacity-80  transition-opacity rounded-lg cursor-pointer "
            onClick={() => {
              openModal("createBoard");
              dispatch(setOpenedFrom("dashboard"));
            }}
          >
            <p className="text-sm text-white/70">Create New Board</p>
            <p className="text-xs text-whilte/70">10 remaining</p>
          </div>
        ) : (
          <div className={DESIGN_TOKENS.layout.grid}>
            <BoardGrid boards={workspaceBoards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
