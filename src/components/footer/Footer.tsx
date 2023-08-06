import React from "react";
import instagram from "../../assets/images/footer/instagram.svg";
import telegram from "../../assets/images/footer/telegram.svg";
import whatsapp from "../../assets/images/footer/whatsapp.svg";

const Footer: React.FC = () => {
  return (
    <div className="pt-60 pb-[115px] bg-gray">
      <div className="container flex gap-[150px] slt:flex-col slt:gap-[40px]">
        <div>
          <h3 className="text-[20px] font-bold mb-[24px]">Разработчик</h3>
          <a href="mailto:azim.kojoev1987@gmail.com">
            azim.kojoev1987@gmail.com
          </a>
        </div>
        <div>
          <h3 className="text-[20px] font-bold mb-[24px]">Соцсети</h3>
          <ul className="flex gap-[16px]">
            <li>
              <a
                href="https://www.instagram.com/hee1_sen/"
                rel="noreferrer"
                target="_blank"
              >
                <img src={instagram} alt="instagram" />
              </a>
            </li>
            <li>
              <a href="https://t.me/he1ssen" rel="noreferrer" target="_blank">
                <img src={telegram} alt="telegram" />
              </a>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=996555010965"
                rel="noreferrer"
                target="_blank"
              >
                <img src={whatsapp} alt="whatsapp" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
