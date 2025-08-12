import { Outlet, useLocation } from "react-router-dom";
// import Navigation from "@/components/Navigation/Navigation";
import Sidebar from "@components/Dashboard/Sidebar";
import Navigation from "@components/Navigation/Navigation";

const DashboardLayout = () => {
  const location = useLocation();
  const isBoardPage = location.pathname.includes("/b/");

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <div
        className={`flex flex-1   board  ${
          isBoardPage ? "overflow-y-hidden flex-col" : "overflow-y-auto"
        }  `}
      >
        {!isBoardPage && <Sidebar />}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
