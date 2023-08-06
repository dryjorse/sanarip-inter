import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { activeDiscount } from "../../../utillities";

const Info: React.FC = () => {
  const { name, vendor, colors, dimensions, price, photos } = useSelector(
    (state: RootState) => state.product.data
  );
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    let sliderTimeout = setInterval(() => {
      if (photos.slider.length) {
        setActivePhoto((number) =>
          number + 1 < photos.slider.length ? number + 1 : 0
        );
      }
    }, 2000);

    return () => {
      clearInterval(sliderTimeout);
    };
  }, [photos.slider.length]);

  return (
    <div className="pb-[150px] container flex justify-center items-center gap-[50px] lt:flex-col lt:gap-[20px]">
      <div className="relative flex-[0_1_630px] min-h-[475px] flex justify-center items-center lt:flex-[0_1_auto] lt:w-full">
        {photos.slider.map((photo, key) => (
          <img
            key={key}
            src={photo}
            alt="slider-product"
            className="absolute trs"
            style={{ opacity: activePhoto === key ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="font-medium text-[#9C9C9C] text-20">
        <h1 className="text-[30px] leading-30 text-black">{name}</h1>
        <span className="mt-20 mb-40 block">Артикул {vendor}</span>
        <span>Цвета</span>
        <div className="mt-[8px] mb-[35px] flex gap-[5px]">
          {colors.map((color) => (
            <div
              key={color}
              className="border border-black rounded-circle p-[1px] w-[30px] h-[30px]"
            >
              <div
                style={{
                  backgroundColor: color,
                }}
                className="rounded-circle h-full"
              ></div>
            </div>
          ))}
        </div>
        <div className="mb-[35px]">
          <span>Размеры в наличии:</span>
          <div className="mt-10 flex">
            {dimensions.map((dimension) => (
              <span
                key={dimension}
                className="px-[10px] text-[17px] font-light text-black"
              >
                {dimension}
              </span>
            ))}
          </div>
        </div>
        <span className="relative text-[50px] text-green font-bold">
          {activeDiscount(price)} c
          <span className="absolute text-[30px] leading-normal font-medium top-[-30px] left-[125px] whitespace-nowrap text-[#B0B0B0] line-through">
            {price} c
          </span>
        </span>
      </div>
    </div>
  );
};

export default Info;
