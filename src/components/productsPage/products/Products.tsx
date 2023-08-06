import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../../store/store";
import {
  clearFilterSettings,
  getProducts,
} from "../../../store/slices/productsSlice";
import { useSelector } from "react-redux";
import ProductCard from "../../productCard/ProductCard";
import ProductCardSkeleton from "../../productCard/ProductCardSkeleton";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, errorMsg } = useSelector(
    (state: RootState) => state.products
  );
  const [editedProductId, setEditedProductId] = useState(0);

  useEffect(() => {
    dispatch(getProducts());

    return () => {
      dispatch(clearFilterSettings());
    };
  }, [dispatch]);

  return (
    <div
      className="
      py-[105px] grid grid-cols-4 gap-x-[20px] gap-y-[30px] 
      dt:grid-cols-[repeat(3,minmax(0,auto))] dt:justify-center
      lt:grid-cols-[repeat(2,minmax(0,auto))]
      tb:grid-cols-[repeat(1,minmax(0,auto))]
    "
    >
      {status === "loading" ? (
        [...new Array(8)].map((_, key) => <ProductCardSkeleton key={key} />)
      ) : status === "error" ? (
        <h1>{errorMsg}</h1>
      ) : !data.length ? (
        <h1 className="text-center">Не найдено товаров</h1>
      ) : (
        data.map((product) => (
          <ProductCard
            key={product.id}
            editedProductId={editedProductId}
            setEditedProductId={setEditedProductId}
            {...product}
          />
        ))
      )}
    </div>
  );
};

export default Products;
