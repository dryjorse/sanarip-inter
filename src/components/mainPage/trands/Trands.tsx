import React from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import "swiper/css";
import ProductsSlider from "../../productsSlider/ProductsSlider";

const Trands: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.trands);

  return (
    <div className="pb-[75px]">
      <div className="title">
        <div></div>
        <h2>Горячие тренды</h2>
        <div></div>
      </div>
      <div className="container mt-[170px]">
        <ProductsSlider products={data} />
      </div>
    </div>
  );
};

export default Trands;
