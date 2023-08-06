import React from "react";
import trophy from "../../../assets/images/mainPage/trophy.svg";
import guarantee from "../../../assets/images/mainPage/guarantee.svg";
import shopping from "../../../assets/images/mainPage/shipping.svg";
import support from "../../../assets/images/mainPage/customer-support.svg";

const WhyUs: React.FC = () => {
  return (
    <div className="pt-[60px] pb-[170px] slt:pb-80">
      <div className="title">
        <div></div>
        <h2>Почему именно мы?</h2>
        <div></div>
      </div>
      <ul
        className="
          container mt-80 grid grid-cols-4 justify-between font-fira 
          dt:grid-cols-[repeat(2,auto)] dt:justify-center dt:gap-[40px]
          slt:grid-cols-[repeat(1,auto)]
        "
      >
        <li className="flex gap-[25px] items-center">
          <div className="">
            <img src={trophy} alt="trophy" />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-18 font-semibold">Высокое качество</h3>
            <span className="text-gray-opacity">
              Изготовлено по лучшим технологиям
            </span>
          </div>
        </li>
        <li className="flex gap-[25px] items-center">
          <div className="">
            <img src={guarantee} alt="guarantee" />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-18 font-semibold">Гарантийный срок</h3>
            <span className="text-gray-opacity">В течение двух месяцев</span>
          </div>
        </li>
        <li className="flex gap-[25px] items-center">
          <div className="">
            <img src={shopping} alt="shopping" />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-18 font-semibold">Покупки без риска</h3>
            <span className="text-gray-opacity">
              Лучшие условия по возврату и обмену
            </span>
          </div>
        </li>
        <li className="flex gap-[25px] items-center">
          <div className="">
            <img src={support} alt="support" />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-18 font-semibold">Поддержка 24 / 7 </h3>
            <span className="text-gray-opacity">Служба поддержки</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WhyUs;
