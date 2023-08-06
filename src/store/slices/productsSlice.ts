import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IFiltersSettings,
  IMyKnownError,
  IProduct,
  IStatus,
} from "../../@types";
import $api from "../../http";
import { RootState } from "../store";

interface IProductsUI {
  count: number;
  results: IProduct[];
}

export const getProducts = createAsyncThunk<
  IProductsUI,
  void,
  { rejectValue: IMyKnownError; state: RootState }
>("products", async (_, { rejectWithValue, getState }) => {
  try {
    const { products } = getState();
    const { data } = await $api("products", {
      params: {
        categories: products.filterSettings.category,
        brand: products.filterSettings.brands.join(","),
        dimensions: products.filterSettings.dimensions.join(","),
        season: products.filterSettings.seasons.join(","),
        colors: products.filterSettings.colors
          .map((color) => color.slice(1))
          .join(","),
        offset: products.filterSettings.offset,
        limit: products.filterSettings.limit,
        search: products.filterSettings.search,
      },
    });
    return { ...data };
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface ProductsSliceState {
  status: IStatus;
  data: IProduct[];
  count: number;
  errorMsg: string;
  filterSettings: IFiltersSettings;
}

const initialState: ProductsSliceState = {
  status: "",
  data: [],
  count: 0,
  errorMsg: "",
  filterSettings: {
    category: "",
    brands: [],
    dimensions: [],
    seasons: [],
    colors: [],
    offset: 0,
    limit: 20,
    search: "",
  },
};

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setFilterSettings(state, action: PayloadAction<IFiltersSettings>) {
      state.filterSettings = action.payload;
    },
    setStatus(state, action: PayloadAction<IStatus>) {
      state.status = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.filterSettings.search = action.payload;
    },
    clearFilterSettings(state) {
      state.filterSettings = {
        category: "",
        brands: [],
        dimensions: [],
        seasons: [],
        colors: [],
        offset: 0,
        limit: 20,
        search: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.results;
      state.count = action.payload.count;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = "Что-то пошло не так";
    });
  },
});

export default productsSlice.reducer;
export const {
  setFilterSettings,
  setStatus,
  setSearchValue,
  clearFilterSettings,
} = productsSlice.actions;
