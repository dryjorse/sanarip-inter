import React, { useState } from "react";
import { IProduct } from "../../@types";
import { Link } from "react-router-dom";
import { activeDiscount } from "../../utillities";
import { RootState, useAppDispatch } from "../../store/store";
import { edit } from "../../store/slices/userSlice";
import heart from "../../assets/images/productCard/heart.svg";
import heartFilled from "../../assets/images/productCard/heartFilled.svg";
import { useSelector } from "react-redux";
import Loading from "../ui/loading/Loading";

interface ProductCardProps extends IProduct {
  editedProductId: number;
  setEditedProductId: React.Dispatch<React.SetStateAction<number>>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  photos,
  price,
  dimensions,
  colors,
  editedProductId,
  setEditedProductId,
}) => {
  const dispatch = useAppDispatch();
  const { isAuth, data, status } = useSelector(
    (state: RootState) => state.user
  );
  const isInFavourites = () => data.favouriteProducts.includes(id);

  const handleFavourites = () => {
    if (isAuth) {
      setEditedProductId(id);

      if (isInFavourites())
        dispatch(
          edit({
            ...data,
            favouriteProducts: data.favouriteProducts.filter(
              (productId) => productId !== id
            ),
          })
        );
      else
        dispatch(
          edit({ ...data, favouriteProducts: [...data.favouriteProducts, id] })
        );
    } else {
      alert("Зарегистрируйтесь чтобы добавлять продукты в избранные");
    }
  };

  return (
    <div className="relative max-w-[305px] font-fira">
      <h3 className="py-20 rounded-[10px_10px_0px_0px] w-full bg-green text-18 leading-[20px] font-medium text-center text-white">
        {name}
      </h3>
      <div
        style={{ backgroundImage: `url(${photos.card})` }}
        className="mb-[7px] py-20 px-10 rounded-[0px_0px_10px_10px] h-[235px] flex flex-col justify-between items-end bg-bottom"
      >
        <button onClick={handleFavourites}>
          <img src={isInFavourites() ? heartFilled : heart} alt="heart" />
        </button>
        <span className="pr-30 text-[26px] text-green font-bold">
          {activeDiscount(price)} с
        </span>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="text-gray-opacity font-medium">
            Размеры в наличии:
          </span>
          <div className="mt-5 flex gap-[5px] [&>:not(:last-child)]:border-r">
            {dimensions.map((dimension) => (
              <span
                className="pr-[3px]  h-[17px] leading-[17px] font-light"
                key={dimension}
              >
                {dimension}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="block text-gray-opacity font-medium text-end">
            Цвета:
          </span>
          <div className="mt-[1.5px] flex gap-[7px]">
            {colors.map((color, key) => (
              <div key={key} className="border rounded-circle">
                <div
                  style={{ backgroundColor: color }}
                  className="m-[1px] rounded-circle w-[19px] h-[19px]"
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[15px] flex justify-between">
        <Link to={`/products/${id}`} className="btn2 px-[25px]">
          Подробнее
        </Link>
      </div>
      <div
        style={{
          display:
            status === "loading" && editedProductId === id ? "flex" : "none",
        }}
        className="absolute top-0 left-0 w-full h-full justify-center items-center bg-[rgba(255,255,255,0.5)]"
      >
        <Loading />
      </div>
    </div>
  );
};

export default ProductCard;
