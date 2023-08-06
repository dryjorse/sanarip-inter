import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authPageRouter } from "../../router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AuthPage: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  if (isAuth) return <Navigate to="/profile" />;

  return (
    <div className="pt-[250px] pb-[115px] px-[16px] min-h-screen flex justify-center font-fira">
      <Routes>
        {authPageRouter.map((route) => (
          <Route {...route} />
        ))}
      </Routes>
    </div>
  );
};

export default AuthPage;
