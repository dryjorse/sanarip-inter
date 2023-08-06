export interface IMyKnownError {
  errorMessage: string;
}
export type IStatus = "" | "loading" | "success" | "error";
export interface INewProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  linkId: number;
}
export interface IProductPhoto {
  card: string;
  slider: string[];
  secondPhoto: string;
}
export interface IProduct {
  id: number;
  name: string;
  vendor: number;
  price: number;
  dimensions: number[];
  colors: string[];
  categories: string[];
  brand: string;
  season: string;
  type: string[];
  photos: IProductPhoto;
  isTrand: boolean;
}
export interface IFilterItems {
  categories: string[];
  brands: string[];
  dimensions: number[];
  seasons: string[];
  colors: string[];
}
export interface IFiltersSettings {
  category: string;
  brands: string[];
  dimensions: number[];
  seasons: string[];
  colors: string[];
  offset: number;
  limit: number;
  search: string;
}
export interface IUser {
  name: string;
  surname: string;
  email: string;
  favouriteProducts: number[];
}
