import { publicRoutesConstant, protectedRoutesConstant } from "@/routes/routes";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import { ROUTES } from "./utils/util.constant";
import { slugify } from "./utils/slugify";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          {publicRoutesConstant(isAuthenticated, user).map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          <Route
            element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}
          >
            {protectedRoutesConstant.map((route, index) => (
              <Route key={index} element={route.element}>
                {route.children?.map((child, cIndex) => (
                  <Route
                    key={cIndex}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            ))}
          </Route>

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate
                  to={ROUTES.DASHBOARD(slugify(user.username))}
                  replace
                />
              ) : (
                <Navigate to={ROUTES.LOGIN} replace />
              )
            }
          />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
