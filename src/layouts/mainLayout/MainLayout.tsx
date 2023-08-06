import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/menu/Menu";

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleIsMenuOpen = () => {
    setIsMenuOpen((bool) => !bool);
  };

  return (
    <>
      <Header handleIsMenuOpen={handleIsMenuOpen} />
      <Menu isOpen={isMenuOpen} handleIsOpen={handleIsMenuOpen} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
