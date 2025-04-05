import { useEffect, useState } from "react";
import ProductsCards from "./ProductsCard";
import ShopFiltering from "./ShopFiltering";
import { IFilters, ISelectedFilters } from "../../interfaces";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";

const filters: IFilters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "green", "silver", "beige"],
  priceRange: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above ", min: 200, max: Infinity },
  ],
};

const Shop = () => {
  const [filtersState, setFiltersState] = useState<ISelectedFilters>({
    category: "all",
    color: "all",
    priceRange: { min: 0, max: Infinity },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);

  const { color, category, priceRange } = filtersState;

  const { data, error, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: productsPerPage,
    category: category !== "all" ? category : undefined,
    color: color !== "all" ? color : undefined,
    minPrice: priceRange.min !== 0 ? priceRange.min : undefined,
    maxPrice: priceRange.max !== Infinity ? priceRange.max : undefined,
  });

  const productsData = data?.products || [];

  //clear the filters
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: { min: 0, max: Infinity },
    });
  };

  //handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= data.totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]); // Runs when page changes

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products</p>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + productsData.length - 1;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Browse our wide selection of clothing, accessories, and footwear. From
          chic dresses to versatile shoes, we have got you covered.
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-3">
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* right side */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Showing {startProduct} to {endProduct} of {data?.totalProducts}
            </h3>
            <ProductsCards products={productsData} />
            {/* pagination controls */}
            <div className="mt-6 flex justify-center gap-2">
              <button
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 first-letter:text-gray-700 rounded-md"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {[...Array(data.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-md mx-1`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
              disabled={currentPage === data.totalPages}
                className="px-4 py-2 bg-gray-300 first-letter:text-gray-700 rounded-md"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
