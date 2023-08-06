import React, { useState } from "react";
import { IProduct } from "../../@types";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../productCard/ProductCard";

interface ProductsSliderProps {
  products: IProduct[];
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  const [editedProductId, setEditedProductId] = useState(0);

  const sliderBreakPoints = {
    0: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1.1,
    },
    620: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2.1,
    },
    1024: {
      slidesPerView: 3.1,
    },
    1300: {
      slidesPerView: 4.1,
    },
  };

  return (
    <Swiper
      //@ts-ignore
      breakpoints={sliderBreakPoints}
      grabCursor
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard
            editedProductId={editedProductId}
            setEditedProductId={setEditedProductId}
            {...product}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsSlider;
