import BgLoginIllustrat from "@/assets/Images/bg-illustrators/bg-2.svg";
import RegisterForm from "@/components/forms/RegisterForm";
import { setTheme } from "@/features/theme/themeSlice";
import usePageSeo from "@/hooks/usePageSeo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function RegisterPage() {
  const dispatch = useDispatch();
  usePageSeo("Register");

  useEffect(() => {
    dispatch(setTheme("light"));
    return () => {
      dispatch(setTheme("dark"));
    };
  }, [dispatch]);

  return (
    <>
      <div className="relative min-h-screen  ">
        <img
          src={BgLoginIllustrat}
          alt="Background Bottom Left"
          className="pointer-events-none select-none fixed bottom-2 -left-15 w-1/3 max-w-xs z-0"
          aria-hidden="true"
          draggable="false"
          style={{ userSelect: "none" }}
        />
        <div className="w-1/3 mx-auto my-12 p-8  bg-[#ffffff] z-10 login-form">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
