import React, { useEffect, useState, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import burgerIcon from "../../assets/images/header/burger.svg";
import searchIcon from "../../assets/images/header/search.svg";
import personIcon from "../../assets/images/header/person.svg";
import pointsIcon from "../../assets/images/header/navigation.svg";
import { RootState, useAppDispatch } from "../../store/store";
import { setSearchValue } from "../../store/slices/productsSlice";
import SearchTooltip from "../searchTooltip/SearchTooltip";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

interface HeaderProps {
  handleIsMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleIsMenuOpen }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isSearchTooltipOpen, setIsSearchTooltipOpen] = useState(false);
  const { isAuth, data } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Скрывает header при скролле вниз
    const handleScroll = () => {
      const scrollPosition = document.documentElement.scrollTop;

      if (scrollPosition >= 85) setIsHidden(true);
      else setIsHidden(false);
    };
    window.addEventListener("scroll", handleScroll);

    // Скрывает tooltip профиля при нажатии на другие части страницы
    const handleTooltipOpen = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !event.composedPath().includes(tooltipRef.current)
      ) {
        setIsTooltipOpen(false);
      }
    };
    document.body.addEventListener("click", handleTooltipOpen);

    return () => {
      // Очищение всех событий при скрывании компоненты header
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("click", handleTooltipOpen);
    };
  }, []);

  const dispatchSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatchSearchValue(event.target.value);
  };

  return (
    <div
      className={`pt-[17px] fixed top-0 left-0 w-full trs z-50 ${
        isHidden ? "translate-y-[-100%]" : ""
      }`}
    >
      <div className="container">
        <div className="text-center border-b border-b-[#DDDDDD] pb-20 slt:border-b-0 slt:flex slt:justify-between slt:items-center slt:pb-0">
          <button
            className="flex-shrink-0 hidden slt:block"
            onClick={handleIsMenuOpen}
          >
            <img src={burgerIcon} alt="burger" />
          </button>
          <span>Logo</span>
          <div ref={tooltipRef} className="relative hidden slt:block">
            <button onClick={() => setIsTooltipOpen((bool) => !bool)}>
              <img src={pointsIcon} alt="points" />
            </button>
            <div
              style={{
                opacity: isTooltipOpen ? 1 : 0,
                pointerEvents: isTooltipOpen ? "all" : "none",
              }}
              className="absolute top-[30px] rounded-[12px] p-[16px] w-[220px] bg-white translate-x-[-100%] shadow-[0px_24px_38px_0px_rgba(0,0,0,0.04),_0px_9px_46px_0px_rgba(0,0,0,0.06),_0px_11px_15px_0px_rgba(0,0,0,0.10)] z-[150] trs"
            >
              <ul>
                <li>
                  <Link
                    to={isAuth ? "/profile" : "/auth/login"}
                    className="flex items-center gap-[5px] w-full"
                  >
                    <img src={personIcon} alt="person" />
                    <span>{isAuth ? "Профиль" : "Войти"}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-30 flex justify-between gap-[40px] slt:justify-center">
          <button
            className="flex-shrink-0 slt:hidden"
            onClick={handleIsMenuOpen}
          >
            <img src={burgerIcon} alt="burger" />
          </button>
          <div className="relative flex-[0_1_578px] inp">
            <img src={searchIcon} alt="search" />
            <input
              type="text"
              value={value}
              placeholder="Искать"
              className="flex-grow"
              onChange={onChangeSearch}
              onFocus={() => setIsSearchTooltipOpen(true)}
              onBlur={() => setIsSearchTooltipOpen(false)}
            />
            <SearchTooltip isOpen={isSearchTooltipOpen} />
          </div>
          <Link
            to={isAuth ? "/profile" : "/auth/login"}
            className="btn flex items-center gap-[8px] flex-shrink-0 slt:hidden"
          >
            <img src={personIcon} alt="person" />
            <span>{isAuth ? "Профиль" : "Войти"}</span>
          </Link>
        </div>
      </div>
      <div className="bg-green shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[15px]"></div>
    </div>
  );
};

export default Header;
