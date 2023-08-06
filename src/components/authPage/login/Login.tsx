import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../store/store";
import { useInput } from "../../../hooks/useInput";
import { login } from "../../../store/slices/userSlice";
import Loading from "../../ui/loading/Loading";
import { useSelector } from "react-redux";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.user.status);
  const email = useInput("", { isEmail: true, minLength: 3, isEmpty: true });
  const password = useInput("", {
    minLength: 3,
    maxLength: 20,
    isEmpty: true,
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    if (email.inputValid && password.inputValid) setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
  }, [email.inputValid, password.inputValid]);

  const loginFunc = () => {
    dispatch(login({ email: email.value, password: password.value }));
  };

  return (
    <div className="text-center max-w-[555px] w-full">
      <h1 className="text-[34px] leading-[48px] text-green font-bold">Войти</h1>
      <span className="block mt-[4px] mb-[57px] text-20 leading-[21px] text-[#908E8E]">
        Введите свои данные чтобы продолжить
      </span>
      <form
        action="/"
        method="post"
        onSubmit={(e) => e.preventDefault()}
        className="relative [&>:not(:last-child)]:mb-10"
      >
        <input
          type="email"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          placeholder="Email"
          className={`inp2 w-full ${email.errorMsg ? "error" : ""}`}
        />
        {email.errorMsg && <span className="error-msg">{email.errorMsg}</span>}
        <input
          type="password"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          placeholder="Пароль"
          className={`inp2 w-full ${password.errorMsg ? "error" : ""}`}
        />
        {password.errorMsg && (
          <span className="error-msg">{password.errorMsg}</span>
        )}
        <button
          disabled={isBtnDisabled}
          onClick={loginFunc}
          className="mt-[55px] mx-auto py-20 px-40 btn2 text-[25px] leading-[15px] trs1 disabled:opacity-[0.5]"
        >
          Войти
        </button>
        <div
          style={{ display: status === "loading" ? "flex" : "none" }}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(255,255,255,0.5)]"
        >
          <Loading />
        </div>
      </form>
      <span className="block mt-50 text-[#7C7C7C]">
        Eщё нет аккаунта?{" "}
        <Link to="/auth/registration" className="text-green underline">
          Зарегистрируйтесь
        </Link>
      </span>
    </div>
  );
};

export default Login;
