import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import sliderLeftArrowIcon from "../../../assets/images/common/slider-arrow-left.svg";
import sliderRightArrowIcon from "../../../assets/images/common/slider-arrow-right.svg";
import "swiper/css";
import { Link } from "react-router-dom";

const MainSlider: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.newProducts);

  return (
    <div className="px-[16px]">
      <div className="mx-auto rounded-[48px] py-[120px] max-w-[1375px] flex justify-between bg-gray gap-[60px] lt:py-80 slt:gap-0 slt:py-40">
        <button className="main-slider-arrow left px-[25px] flex-shrink-0 slt:px-0">
          <img src={sliderLeftArrowIcon} alt="slider-arrow-left" />
        </button>
        <Swiper
          //@ts-ignore
          loop
          slidesPerView={"auto"}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".main-slider-arrow.left",
            nextEl: ".main-slider-arrow.right",
          }}
          speed={500}
          grabCursor
          className="slt:flex-grow"
        >
          {data.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="flex justify-between lt:flex-col slt:gap-[100px]">
                <div className="flex-[0_1_495px] lt:flex-[0_1_auto]">
                  <h3 className="text-[48px] leading-[62px] font-bold slt:text-[24px] slt:leading-[31px]">
                    {product.title}
                  </h3>
                  <span className="block mt-20 mb-40 font-medium text-[20px] slt:mt-[16px] slt:text-18 slt:leading-normal">
                    {product.description}
                  </span>
                  <Link to={`/products/${product.linkId}`} className="btn border-2 rounded-[30px] py-[12px] px-[47px] text-[#333333] text-18 font-bold">
                    Подробнее
                  </Link>
                </div>
                <div>
                  <img
                    className="w-full lt:mx-auto"
                    src={product.image}
                    alt="new-product"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="main-slider-arrow right px-[25px] flex-shrink-0 slt:px-0">
          <img src={sliderRightArrowIcon} alt="slider-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default MainSlider;
