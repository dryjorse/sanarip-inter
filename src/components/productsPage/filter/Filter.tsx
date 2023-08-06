import React, { useEffect, useState, useRef } from "react";
import { RootState, useAppDispatch } from "../../../store/store";
import { getFilterItems } from "../../../store/slices/filterItemsSlice";
import { useSelector } from "react-redux";
import { IFilterItemsUI, filterItemsUI } from "../../../utillities";
import { IFilterItems } from "../../../@types";
import Items from "./Items";
import { getProducts } from "../../../store/slices/productsSlice";

interface TooltipProps extends IFilterItemsUI {
  data: IFilterItems;
}

const Tooltip: React.FC<TooltipProps> = ({ name, keyWord, data }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const getCustomedProducts = () => {
    dispatch(getProducts());
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      key={keyWord}
      className="relative flex justify-center"
    >
      <button className="border border-green rounded-[10px] py-[8px] px-[28px] text-green text-24 leading-30">
        {name}
      </button>
      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? bodyRef.current?.scrollHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="absolute pt-[70px] w-fit overflow-hidden trs z-50"
      >
        <div className="border border-[#908E8E] rounded-[10px_10px_0_0] px-10 bg-white">
          <Items type={keyWord} data={data[keyWord]} />
        </div>
        <button
          onClick={getCustomedProducts}
          className="rounded-[0_0_10px_10px] py-10 w-full bg-green uppercase text-18 text-white text-center "
        >
          Применить
        </button>
      </div>
    </div>
  );
};

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.filterItems);

  useEffect(() => {
    dispatch(getFilterItems());
  }, [dispatch]);

  return (
    <div className="flex justify-between items-center flex-wrap gap-[20px] slt:justify-center">
      {filterItemsUI.map((item) => (
        <Tooltip
          key={item.keyWord}
          name={item.name}
          keyWord={item.keyWord}
          data={data}
        />
      ))}
    </div>
  );
};

export default Filter;
