import React, { useState, useEffect } from "react";
import heart from "../../../assets/images/productCard/heart.svg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { useInput } from "../../../hooks/useInput";
import { edit, logout } from "../../../store/slices/userSlice";
import { Link } from "react-router-dom";
import Loading from "../../ui/loading/Loading";

const Data: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useSelector((state: RootState) => state.user);
  const surname = useInput(data.surname, {
    minLength: 3,
    isEmpty: true,
    isSWBL: true,
  });
  const name = useInput(data.name, {
    minLength: 3,
    isEmpty: true,
    isSWBL: true,
  });
  const email = useInput(data.email, {
    isEmail: true,
    minLength: 3,
    isEmpty: true,
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  console.log(status)

  useEffect(() => {
    if (
      surname.inputValid &&
      name.inputValid &&
      email.inputValid &&
      (surname.value !== data.surname ||
        name.value !== data.name ||
        email.value !== data.email) &&
      status !== "loading"
    )
      setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
  }, [surname.value, name.value, email.value, status]);

  const changeData = () => {
    dispatch(
      edit({ name: name.value, surname: surname.value, email: email.value })
    );
  };

  const logoutFunc = () => {
    dispatch(logout());
  };

  return (
    <div className="mx-auto max-w-[695px]">
      <h1 className="text-center text-[26px] leading-[21px]">Мои данные</h1>
      <div className="mt-40 border border-green rounded-[10px] pt-40 pb-100 pl-50 pr-80">
        <div className="flex justify-between tb:flex-col">
          <div className="relative [&>:not(:last-child)]:mb-10">
            <div>
              <h2 className="text-[#908E8E] text-12">Фамилия</h2>
              <input
                type="text"
                value={surname.value}
                onChange={surname.onChange}
                onBlur={surname.onBlur}
                className="border-solid border-0 border-b border-b-[#C4C4C4] py-[11px] font-medium"
              />
              {surname.errorMsg && (
                <span className="error-msg">{surname.errorMsg}</span>
              )}
            </div>
            <div>
              <h2 className="text-[#908E8E] text-12">Имя</h2>
              <input
                type="text"
                value={name.value}
                onChange={name.onChange}
                onBlur={name.onBlur}
                className="border-solid border-0 border-b border-b-[#C4C4C4] py-[11px] font-medium"
              />
              {name.errorMsg && (
                <span className="error-msg">{name.errorMsg}</span>
              )}
            </div>
            <div>
              <h2 className="text-[#908E8E] text-12">E-mail</h2>
              <input
                type="text"
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
                className="border-solid border-0 border-b border-b-[#C4C4C4] py-[11px] font-medium"
              />
              {email.errorMsg && (
                <span className="error-msg">{email.errorMsg}</span>
              )}
            </div>
            <div
              style={{ display: status === "loading" ? "flex" : "none" }}
              className="absolute top-0 left-0 w-full h-full justify-center items-center bg-[rgba(255,255,255,0.5)]"
            >
              <Loading />
            </div>
          </div>
          <Link to="/profile/favourites">
            <div className="mx-auto mb-[8px] w-[24px] h-[24px] tb:w-0">
              <img className="w-full h-full" src={heart} alt="heart" />
            </div>
            <span>
              Товаров:{" "}
              <b className="text-green">{data.favouriteProducts.length}</b>
            </span>
          </Link>
        </div>
        <div className="flex tb:flex-col">
          <button
            disabled={isBtnDisabled}
            onClick={changeData}
            className="mt-[50px] mx-auto btn2 py-[15px] px-30 trs1 disabled:opacity-[0.5] tb:mx-0"
          >
            Сохранить
          </button>
          <button
            onClick={logoutFunc}
            className="mt-[50px] mx-auto btn2 py-[15px] px-30 trs1 disabled:opacity-[0.5] tb:mx-0"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Data;
