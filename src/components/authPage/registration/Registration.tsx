import React, { useState, useEffect } from "react";
import { useInput } from "../../../hooks/useInput";
import { RootState, useAppDispatch } from "../../../store/store";
import { registration } from "../../../store/slices/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../ui/loading/Loading";

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.user.status);
  const email = useInput("", { isEmail: true, minLength: 3, isEmpty: true });
  const name = useInput("", { minLength: 3, isEmpty: true, isSWBL: true });
  const surname = useInput("", { minLength: 3, isEmpty: true, isSWBL: true });
  const password = useInput("", {
    minLength: 3,
    maxLength: 20,
    isEmpty: true,
  });
  const confirmPassword = useInput("", {
    confirmTo: password.value,
    minLength: 3,
    isEmpty: true,
  });
  const [isAgreement, setIsAgreement] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    if (
      name.inputValid &&
      surname.inputValid &&
      email.inputValid &&
      password.inputValid &&
      confirmPassword.inputValid &&
      isAgreement
    )
      setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
  }, [
    name.inputValid,
    surname.inputValid,
    email.inputValid,
    password.inputValid,
    confirmPassword.inputValid,
    isAgreement,
  ]);

  const registrationFunc = () => {
    dispatch(
      registration({
        email: email.value,
        name: name.value,
        surname: surname.value,
        password: password.value,
      })
    );
  };

  return (
    <div className="text-center max-w-[555px] w-full">
      <h1 className="text-[34px] leading-[48px] text-green font-bold">
        Регистрация
      </h1>
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
        <div className="flex gap-[20px]">
          <div className="flex-grow">
            <input
              type="text"
              value={name.value}
              onChange={name.onChange}
              onBlur={name.onBlur}
              placeholder="Имя"
              className={`inp2 w-full ${name.errorMsg ? "error" : ""}`}
            />
            {name.errorMsg && (
              <span className="error-msg mt-10">{name.errorMsg}</span>
            )}
          </div>
          <div className="flex-grow">
            <input
              type="text"
              value={surname.value}
              onChange={surname.onChange}
              onBlur={surname.onBlur}
              placeholder="Фамилия"
              className={`inp2 w-full ${surname.errorMsg ? "error" : ""}`}
            />
            {surname.errorMsg && (
              <span className="error-msg mt-10">{surname.errorMsg}</span>
            )}
          </div>
        </div>
        <input
          type="password"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          placeholder="Пароль"
          className={`inp2 w-full ${password.errorMsg ? "error" : ""}`}
        />
        {password.errorMsg && (
          <span className="error-msg mt-10">{password.errorMsg}</span>
        )}
        <input
          type="password"
          value={confirmPassword.value}
          onChange={confirmPassword.onChange}
          onBlur={confirmPassword.onBlur}
          placeholder="Подтвердите пароль"
          className={`inp2 w-full ${confirmPassword.errorMsg ? "error" : ""}`}
        />
        {confirmPassword.errorMsg && (
          <span className="error-msg mt-10">{confirmPassword.errorMsg}</span>
        )}
        <input
          className="hidden checkbox"
          type="checkbox"
          id="registration-agreement"
          onChange={() => setIsAgreement((bool) => !bool)}
          checked={isAgreement}
        />
        <label
          className="checkbox__label2 text-12 justify-center items-end"
          htmlFor="registration-agreement"
        >
          <div>
            <div></div>
          </div>
          <span>Я даю согласие на обработку персональных данных.</span>
        </label>
        <button
          disabled={isBtnDisabled}
          onClick={registrationFunc}
          className="mt-[55px] mx-auto p-20 btn2 text-[25px] leading-[15px] trs1 disabled:opacity-[0.5]"
        >
          Зарегистрироваться
        </button>
        <div
          style={{ display: status === "loading" ? "flex" : "none" }}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(255,255,255,0.5)]"
        >
          <Loading />
        </div>
      </form>
      <span className="block mt-50 text-[#7C7C7C]">
        Уже имеется аккаунт?{" "}
        <Link to="/auth/login" className="text-green underline">
          Войти
        </Link>
      </span>
    </div>
  );
};

export default Registration;
