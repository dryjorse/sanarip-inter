import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMyKnownError, IProduct, IStatus } from "../../@types";
import $api from "../../http";

interface IProductUI extends IProduct {
  similar: IProduct[];
}

export const getProduct = createAsyncThunk<
  IProductUI,
  number,
  { rejectValue: IMyKnownError }
>("product", async (id, { rejectWithValue }) => {
  try {
    const { data } = await $api("product", { params: { id } });
    const similar = await $api("products", {
      params: { search: data.name.split(" ")[0] },
    });
    return {
      ...data,
      similar: similar.data.results.filter(
        (product: IProduct) => product.id !== id
      ),
    };
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface ProductSliceState {
  status: IStatus;
  data: IProductUI;
  errorMsg: string;
}

const initialState: ProductSliceState = {
  status: "",
  data: {
    id: 0,
    name: "",
    vendor: 0,
    price: 0,
    dimensions: [],
    colors: [],
    categories: [],
    brand: "",
    season: "",
    type: [],
    photos: {
      card: "",
      slider: [],
      secondPhoto: "",
    },
    isTrand: false,
    similar: [],
  },
  errorMsg: "",
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "Что-то пошло не так";
    });
  },
});

export default productSlice.reducer;
