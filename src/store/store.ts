import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import newProductsSlice from "./slices/newProductsSlice";
import productsSlice from "./slices/productsSlice";
import filterItemsSlice from "./slices/filterItemsSlice";
import trandsSlice from "./slices/trandsSlice";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import favouriteProductsSlice from "./slices/favouriteProductsSlice";

export const store = configureStore({
  reducer: {
    newProducts: newProductsSlice,
    trands: trandsSlice,
    products: productsSlice,
    product: productSlice,
    filterItems: filterItemsSlice,
    user: userSlice,
    favouriteProducts: favouriteProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
