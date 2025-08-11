import DashboardLayout from "@components/Dashboard/DashboardLayout";
import DashboardPage from "@/pages/Dashboard";
import RegisterPage from "@/pages/Register";
import LoginPage from "@/pages/Login";
import Board from "@components/board/Board";
import { ROUTES } from "@/utils/util.constant";
import { Navigate } from "react-router-dom";

export const publicRoutesConstant = (isAuthenticated, user) => [
  {
    path: ROUTES.LOGIN,
    element: isAuthenticated ? (
      <Navigate to={ROUTES.DASHBOARD(user.username)} replace />
    ) : (
      <LoginPage />
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: isAuthenticated ? (
      <Navigate to={ROUTES.DASHBOARD(user.username)} replace />
    ) : (
      <RegisterPage />
    ),
  },
];

export const protectedRoutesConstant = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD(),
        element: <DashboardPage />,
      },
      {
        path: ROUTES.BOARD(),
        element: <Board />,
      },
    ],
  },
];
