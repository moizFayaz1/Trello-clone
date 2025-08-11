import { useNavigate } from "react-router-dom";
import { BoardCard } from "./BoardCard";
import { navigateToBoard } from "@/utils/navigation";

export const BoardGrid = ({ boards }) => {
  const navigate = useNavigate();

  return (
    <>
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          title={board.title}
          bgImage={board.background_image_url?.regular}
          bgColor={board.background_color}
          onClick={() => navigateToBoard(navigate, board)}
        />
      ))}
     
    </>
  );
};
