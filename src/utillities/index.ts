export function getRandomNumber(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand) + 0;
}

export function activeDiscount(price: number) {
  return +(((price * 92) / 100 + "").slice(0, -2) + "00");
}

export interface IFilterItemsUI {
  name: string;
  keyWord: "categories" | "brands" | "dimensions" | "seasons" | "colors";
}

export const filterItemsUI: IFilterItemsUI[] = [
  {
    name: "Категория",
    keyWord: "categories",
  },
  {
    name: "Бренд",
    keyWord: "brands",
  },
  {
    name: "Размер",
    keyWord: "dimensions",
  },
  {
    name: "Сезон",
    keyWord: "seasons",
  },
  {
    name: "Цвет",
    keyWord: "colors",
  },
];
