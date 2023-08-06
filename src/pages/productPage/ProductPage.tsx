import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import { getProduct } from "../../store/slices/productSlice";
import { useSelector } from "react-redux";
import Info from "../../components/productPage/info/Info";
import Similar from "../../components/productPage/similar/Similar";
import Loading from "../../components/ui/loading/Loading";

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { status, errorMsg } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    id && dispatch(getProduct(+id));
  }, [id, dispatch]);

  if (status === "loading")
    return (
      <Loading className="min-h-[100vh] flex justify-center items-center" />
    );

  if (status === "error")
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>{errorMsg}</h1>
      </div>
    );

  return (
    <div className="pt-[285px] min-h-screen font-fira lt:pt-[200px]">
      <Info />
      <Similar />
    </div>
  );
};

export default ProductPage;
