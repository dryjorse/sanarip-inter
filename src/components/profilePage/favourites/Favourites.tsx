import React, { useEffect } from "react";
import ProductsSlider from "../../productsSlider/ProductsSlider";
import { RootState, useAppDispatch } from "../../../store/store";
import { getFavouriteProducts } from "../../../store/slices/favouriteProductsSlice";
import { useSelector } from "react-redux";
import basketIcon from "../../../assets/images/profile/basket.svg";
import { edit } from "../../../store/slices/userSlice";

const Favourites: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(
    (state: RootState) => state.favouriteProducts.data
  );
  const { data, status, errorMsg } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getFavouriteProducts());
  }, [data.favouriteProducts]);

  const clearFavouriteProducts = () => {
    dispatch(edit({ ...data, favouriteProducts: [] }));
  };

  return (
    <div>
      <h1 className="text-[34px] leading-[48px] text-green font-bold">
        Избранное
      </h1>
      <div className="py-50">
        {status === "error" ? (
          <h2>{errorMsg}</h2>
        ) : !products.length ? (
          <h2>Пусто</h2>
        ) : (
          <ProductsSlider products={products} />
        )}
      </div>
      <div className="flex justify-end">
        <button
          onClick={clearFavouriteProducts}
          className="flex items-center gap-[7px]"
        >
          <img src={basketIcon} alt="basket" />
          <span className="uppercase text-[18px]">Очистить все</span>
        </button>
      </div>
    </div>
  );
};

export default Favourites;
