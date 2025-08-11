import BgLoginIllustrat from "@/assets/Images/bg-illustrators/bg-2.svg";
import { setTheme } from "@/features/theme/themeSlice";
import LoginForm from "@/components/forms/LoginForm";
import usePageSeo from "@/hooks/usePageSeo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function LoginPage() {
  const dispatch = useDispatch();
  usePageSeo("Login");

  useEffect(() => {
    dispatch(setTheme("light"));
    return () => {
      dispatch(setTheme("dark"));
    };
  }, [dispatch]);

  return (
    <>
      {/* <Helmet>
        <title>Login - Trello</title>
        <meta name="description" content="Login to your dashboard" />
      </Helmet> */}

      <div className="relative  min-h-screen overflow-hidden ">
        <img
          src={BgLoginIllustrat}
          alt="Background Bottom Left"
          className="pointer-events-none select-none absolute bottom-2 -left-15 w-1/3 max-w-xs z-0"
          aria-hidden="true"
          draggable="false"
          style={{ userSelect: "none" }}
        />
        <div className="w-1/3 mx-auto my-12 p-8  bg-[#ffffff] z-10 login-form">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
