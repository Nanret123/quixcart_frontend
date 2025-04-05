import React from "react";
import { IFilters, ISelectedFilters } from "../../interfaces/index";

interface ShopFilteringProps {
  filters: IFilters;
  filtersState: ISelectedFilters;
  setFiltersState: React.Dispatch<React.SetStateAction<ISelectedFilters>>;
  clearFilters: () => void;
}

const ShopFiltering: React.FC<ShopFilteringProps> = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>

      {/* categories */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              id="category"
              name="category"
              value={category}
              checked={filtersState.category === category}
              onChange={() =>
                setFiltersState((prevState) => ({
                  ...prevState,
                  category,
                }))
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* colors */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              id="color"
              name="color"
              value={color}
              checked={filtersState.color === color}
              onChange={() =>
                setFiltersState((prevState) => ({
                  ...prevState,
                  color,
                }))
              }
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRange.map((price) => (
          <label
            key={price.label}
            className="capitalize cursor-pointer flex items-center"
          >
            <input
              type="radio"
              id={`price-${price.label}`}
              name="priceRange"
              value={`${price.min}-${price.max}`} // Consistent format
              checked={filtersState.priceRange.min === price.min && filtersState.priceRange.max === price.max}
              onChange={() =>
                setFiltersState((prevState) => ({
                  ...prevState,
                  priceRange: { min: price.min, max: price.max }, // Store as an object
                }))
              }
            />
            <span className="ml-1">{price.label}</span> {/* Corrected text */}
          </label>
        ))}
      </div>

      {/* clear filters */}
      <button className="bg-primary py-1 px-4 text-white rounded" onClick={clearFilters}>Clear All Filters</button>
    </div>
  );
};

export default ShopFiltering;
