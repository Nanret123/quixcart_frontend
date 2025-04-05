import { useState } from "react";
import ProductsCard from "./ProductsCard";
import { useGetTrendingProductsQuery } from "@/redux/features/product/productApi";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(5);
  const { data, error, isLoading } = useGetTrendingProductsQuery({})

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };
  const products =  data?.products || [];

  if(isLoading){
    return <p>Loading...</p>
  }
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader pb-12">
        Check out our latest trends, inspired by fashion trends, accessories,
        and footwear from around the world.
      </p>

      {/* Product Card */}
      <ProductsCard products={products.slice(0, visibleProducts)} />

      {/* Load More Products Button */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn btn--primary" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
