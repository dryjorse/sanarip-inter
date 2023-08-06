import React from "react";
import Filter from "../../components/productsPage/filter/Filter";
import Products from "../../components/productsPage/products/Products";
import Pagination from "../../components/ui/pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import {
  getProducts,
  setFilterSettings,
} from "../../store/slices/productsSlice";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { count, filterSettings } = useSelector(
    (state: RootState) => state.products
  );
  const getPagesCount = () => Math.ceil(count / filterSettings.limit);

  const onChangePage = (newPage: number) => {
    dispatch(
      setFilterSettings({
        ...filterSettings,
        offset: (newPage - 1) * filterSettings.limit,
      })
    );
    dispatch(getProducts());
  };

  return (
    <div className="pt-[230px] pb-[100px] min-h-[100vh] container font-fira">
      <Filter />
      <Products />
      <Pagination
        page={Math.ceil((filterSettings.offset + 1) / filterSettings.limit)}
        limit={getPagesCount()}
        change={onChangePage}
      />
    </div>
  );
};

export default ProductsPage;
