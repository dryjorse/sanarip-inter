import React from "react";
import { Link } from "react-router-dom";
import crossIcon from "../../assets/images/menu/cross.svg";

interface MenuProps {
  isOpen: boolean;
  handleIsOpen: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, handleIsOpen }) => {
  return (
    <div
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
      className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.25)] z-[100] trs"
      onClick={handleIsOpen}
    >
      <nav
        style={{ transform: isOpen ? "translateX(0px)" : "translateX(-100%)" }}
        className="flex w-fit items-start trs"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="pt-[36px] px-[8px] w-[290px] bg-white h-screen font-medium">
          <li>
            <Link
              to="/"
              className="block py-20 pl-[24px] border-b border-b-[#D7D7D7]"
              onClick={handleIsOpen}
            >
              Главная
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="block py-20 pl-[24px] border-b border-b-[#D7D7D7]"
              onClick={handleIsOpen}
            >
              Товары
            </Link>
          </li>
        </ul>
        <button onClick={handleIsOpen} className="p-[16px]">
          <img src={crossIcon} alt="cross" />
        </button>
      </nav>
    </div>
  );
};

export default Menu;
