import React from "react";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { setFilterSettings } from "../../../store/slices/productsSlice";
import clearColor from "../../../assets/images/filter/clear-color.svg";

interface ItemsProps {
  type: string;
  data: string[] | number[];
}

const Items: React.FC<ItemsProps> = ({ type, data }) => {
  const dispatch = useAppDispatch();
  const filterSettings = useSelector(
    (state: RootState) => state.products.filterSettings
  );

  const setCategories = (item: string) => {
    dispatch(
      setFilterSettings({
        ...filterSettings,
        category: filterSettings.category === item ? "" : item,
      })
    );
  };

  const setBrands = (item: string) => {
    dispatch(
      setFilterSettings({
        ...filterSettings,
        brands: filterSettings.brands.includes(item)
          ? filterSettings.brands.filter((brand) => brand !== item)
          : [...filterSettings.brands, item],
      })
    );
  };

  const setDimensions = (item: number) => {
    dispatch(
      setFilterSettings({
        ...filterSettings,
        dimensions: filterSettings.dimensions.includes(item)
          ? filterSettings.dimensions.filter((dimension) => dimension !== item)
          : [...filterSettings.dimensions, item],
      })
    );
  };

  const setSeasons = (item: string) => {
    dispatch(
      setFilterSettings({
        ...filterSettings,
        seasons: filterSettings.seasons.includes(item)
          ? filterSettings.seasons.filter((season) => season !== item)
          : [...filterSettings.seasons, item],
      })
    );
  };

  const setColors = (item: string) => {
    dispatch(
      setFilterSettings({
        ...filterSettings,
        colors: filterSettings.colors.includes(item)
          ? filterSettings.colors.filter((color) => color !== item)
          : [...filterSettings.colors, item],
      })
    );
  };

  const clearColors = () => {
    dispatch(setFilterSettings({ ...filterSettings, colors: [] }));
  };

  switch (type) {
    case "categories":
      return (
        <ul className="pt-10">
          {data.map((item) => (
            <li key={item}>
              <button
                style={{
                  color: filterSettings.category === item ? "black" : "#7E7E7E",
                }}
                className="p-10 block first-letter:uppercase"
                onClick={() => setCategories(item + "")}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      );
    case "brands":
      return (
        <ul className="py-[25px] px-20 grid grid-cols-4 gap-x-[40px] gap-y-[20px] w-[532px] tb:grid-cols-[repeat(1,minmax(0,auto))] tb:justify-center tb:w-full">
          {data.map((item) => (
            <li className="cursor-pointer" key={item}>
              <input
                className="checkbox hidden"
                id={`${item}-filter-brand`}
                type="checkbox"
                onChange={() => setBrands(item + "")}
                checked={filterSettings.brands.includes(item + "")}
              />
              <label
                className="checkbox__label capitalize"
                htmlFor={`${item}-filter-brand`}
              >
                {item}
              </label>
            </li>
          ))}
        </ul>
      );
    case "dimensions":
      return (
        <ul className="p-[12px] grid grid-cols-4 gap-[10px] w-[230px] tb:grid-cols-[repeat(2,minmax(0,auto))] tb:justify-center tb:w-full">
          {data.map((item) => (
            <li key={item}>
              <input
                type="checkbox"
                id={`${item}-filter-dimension`}
                className="hidden peer/dimension"
                onChange={() => setDimensions(+item)}
                checked={filterSettings.dimensions.includes(+item)}
              />
              <label
                className="
                  block border border-[#908E8E] rounded-[10px] px-10 py-[8px] text-24 cursor-pointer
                  leading-30 text-[#908E8E] peer-checked/dimension:bg-green peer-checked/dimension:border-green
                  peer-checked/dimension:text-white
                "
                htmlFor={`${item}-filter-dimension`}
              >
                {item}
              </label>
            </li>
          ))}
        </ul>
      );
    case "seasons":
      return (
        <ul className="py-[25px] px-20 [&>:not(:last-child)]:mb-[15px]">
          {data.map((item) => (
            <li className="cursor-pointer" key={item}>
              <input
                className="checkbox hidden"
                type="checkbox"
                id={`${item}-filter-season`}
                onChange={() => setSeasons(item + "")}
                checked={filterSettings.seasons.includes(item + "")}
              />
              <label
                className="checkbox__label"
                htmlFor={`${item}-filter-season`}
              >
                {item}
              </label>
            </li>
          ))}
        </ul>
      );
    case "colors":
      return (
        <ul className="py-10 px-[18px] grid grid-cols-4 gap-[10px] w-[200px]">
          <li>
            <button onClick={clearColors}>
              <img src={clearColor} alt="clear-color" />
            </button>
          </li>
          {data.map((item) => (
            <li key={item}>
              <input
                type="checkbox"
                id={`${item}-filter-color`}
                className="hidden peer/color"
                onChange={() => setColors(item + "")}
                checked={filterSettings.colors.includes(item + "")}
              />
              <label
                className="
                  block border border-[#908E8E] rounded-[10px] p-[4px] cursor-pointer trs1
                  w-[33px] h-[33px] peer-checked/color:bg-green peer-checked/color:border-green
                "
                htmlFor={`${item}-filter-color`}
              >
                <div
                  style={{ backgroundColor: item + "" }}
                  className="rounded-[10px] w-[24px] h-[24px]"
                ></div>
              </label>
            </li>
          ))}
        </ul>
      );
    default:
      return <div></div>;
  }
};

export default Items;
