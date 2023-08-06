import React from "react";
import ProductsSlider from "../../productsSlider/ProductsSlider";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Similar: React.FC = () => {
  const similarProducts = useSelector(
    (state: RootState) => state.product.data.similar
  );

  return (
    <div>
      <div className="title">
        <div></div>
        <h2>Похожие товары</h2>
        <div></div>
      </div>
      <div className="py-[65px] container">
        {similarProducts.length ? (
          <ProductsSlider products={similarProducts} />
        ) : (
          <span className="block text-center">Не найдено похожих товаров</span>
        )}
      </div>
    </div>
  );
};

export default Similar;
