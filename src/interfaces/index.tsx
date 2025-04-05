export interface IProduct {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  rating: number;
  author?: string;
}

export interface IProductCart extends IProduct{
  quantity: number;
}

export interface IFilters {
  categories: string[]; // Multiple categories
  colors: string[];     // Multiple colors
  priceRange: { label: string; min: number; max: number }[]; // Array of price ranges
}

export interface ISelectedFilters {
  category: string;
  color: string;
  priceRange: { min: number; max: number };
}