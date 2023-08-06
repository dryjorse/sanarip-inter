import React, { useEffect } from "react";
import MainSlider from "../../components/mainPage/mainSlider/MainSlider";
import WhyUs from "../../components/mainPage/whyUs/WhyUs";
import Trands from "../../components/mainPage/trands/Trands";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { getNewProducts } from "../../store/slices/newProductsSlice";
import { getTrands } from "../../store/slices/trandsSlice";
import Loading from "../../components/ui/loading/Loading";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const newProductsStatus = useSelector(
    (state: RootState) => state.newProducts.status
  );
  const trandsStatus = useSelector((state: RootState) => state.trands.status);

  useEffect(() => {
    dispatch(getNewProducts());
    dispatch(getTrands());
  }, [dispatch]);

  return (
    <div className="pt-[230px]">
      {newProductsStatus === "loading" || trandsStatus === "loading" ? (
        <Loading className="min-h-[100vh] flex justify-center items-center" />
      ) : newProductsStatus === "error" || trandsStatus === "error" ? (
        <div className="min-h-[100vh] flex justify-center items-center">
          <h1>Что-то пошло не так</h1>
        </div>
      ) : (
        <>
          <MainSlider />
          <WhyUs />
          <Trands />
        </>
      )}
    </div>
  );
};

export default MainPage;
