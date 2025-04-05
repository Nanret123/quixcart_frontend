import React from "react";
import { IProduct } from "../../interfaces";
import { Link, useNavigate } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { selectAuth } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";

type ProductsCardsProps = {
  products: IProduct[];
};

const ProductsCards: React.FC<ProductsCardsProps> = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);

  const handleAddToCart = (product: IProduct) => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect if not authenticated
      return;
    }
    dispatch(addToCart(product));
    toast.success(`added to cart successfully!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div className="product__card" key={product._id}>
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt="product image"
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </Link>

            <div className="absolute top-3 right-3">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the parent div click event
                  handleAddToCart(product);
                }}
              >
                <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-lg text-white hover:bg-primary-dark"></i>
              </button>
            </div>
          </div>

          {/* product description */}
          <div className="product__card__content">
            <h4>{product.name}</h4>
            <p>
              ${product.price}{" "}
              {product.oldPrice ? <s>${product?.oldPrice}</s> : null}
            </p>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsCards;
