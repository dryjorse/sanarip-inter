import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../../store/slices/productsSlice";

interface SearchTooltipProps {
  isOpen: boolean;
  // setIsOpen: () => void;
}

const SearchTooltip: React.FC<SearchTooltipProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { data } = useSelector((state: RootState) => state.products);
  const searchValue = useSelector(
    (state: RootState) => state.products.filterSettings.search
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, searchValue]);

  if (location.pathname === "/products") return <></>;

  return (
    <div
      style={{ maxHeight: isOpen ? 132 : 0, opacity: isOpen ? 1 : 0 }}
      className="absolute top-[57px] left-[10px] rounded-[0px_0px_10px_10px] max-w-[560px] w-full bg-white shadow-lg overflow-y-scroll trs"
    >
      {data.map((product) => (
        <Link
          key={product.id}
          className="block p-10 hover:bg-green hover:text-white trs1"
          to={`/products/${product.id}`}
        >
          {product.name}
        </Link>
      ))}
    </div>
  );
};

export default SearchTooltip;
