import { Navigate } from "react-router-dom";
import AuthPage from "../pages/authPage/AuthPage";
import MainPage from "../pages/mainPage/MainPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import ProductPage from "../pages/productPage/ProductPage";
import ProductsPage from "../pages/productsPage/ProductsPage";
import Registration from "../components/authPage/registration/Registration";
import Login from "../components/authPage/login/Login";
import ProfilePage from "../pages/profilePage/ProfilePage";
import Data from "../components/profilePage/data/Data";
import Favourites from "../components/profilePage/favourites/Favourites";

export const router = [
  { key: 1, path: "*", element: <NotFoundPage /> },
  { key: 2, path: "/", element: <MainPage /> },
  { key: 3, path: "/products", element: <ProductsPage /> },
  { key: 4, path: "/products/:id", element: <ProductPage /> },
  { key: 5, path: "/auth/*", element: <AuthPage /> },
  { key: 6, path: "/profile/*", element: <ProfilePage /> },
];

export const authPageRouter = [
  { key: 1, path: "/", element: <Navigate to="/auth/registration" /> },
  { key: 2, path: "/registration", element: <Registration /> },
  { key: 3, path: "/login", element: <Login /> },
];

export const profilePageRouter = [
  {
    key: 1,
    path: "/",
    element: (
      <>
        <Data />
      </>
    ),
  },
  {
    key: 2,
    path: "/favourites",
    element: <Favourites />,
  },
];
