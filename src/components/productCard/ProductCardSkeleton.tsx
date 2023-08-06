import React from "react";
import ContentLoader from "react-content-loader";

const ProductCardSkeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={305}
    height={400}
    viewBox="0 0 305 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#e3e3e3"
  >
    <rect x="0" y="0" rx="10" ry="10" width="305" height="265" />
    <rect x="162" y="272" rx="10" ry="10" width="143" height="48" />
    <rect x="0" y="272" rx="10" ry="10" width="151" height="48" />
    <rect x="0" y="333" rx="10" ry="10" width="151" height="35" />
  </ContentLoader>
);

export default ProductCardSkeleton;
