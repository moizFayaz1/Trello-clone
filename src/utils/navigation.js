import { slugify } from "./slugify";
import { ROUTES } from "./util.constant"


export const navigateToBoard = (navigate, board ) => {
    navigate(ROUTES.BOARD(board.id, slugify(board.title)));
}



// export const navigateToDashboard = (navigate, user, board) => {
//     navigate(ROUTES.DASHBOARD(slugify(user.username), slugify(board.title) ))
// }