import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, Route, Routes } from "react-router-dom";
import { profilePageRouter } from "../../router";

const ProfilePage: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  if (!isAuth) return <Navigate to="/auth/login" />;

  return (
    <div className="pt-[255px] pb-100 min-h-screen container font-fira">
      <Routes>
        {profilePageRouter.map((router) => (
          <Route {...router} />
        ))}
      </Routes>
    </div>
  );
};

export default ProfilePage;
