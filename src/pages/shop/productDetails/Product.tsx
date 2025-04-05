import { Link, useNavigate, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import { useGetOneProductQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/interfaces";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { selectAuth } from "@/redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Reviews from "@/pages/reviews/Reviews";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);

  const { data, error, isLoading } = useGetOneProductQuery(productId);

  const product = data?.product || {};

  const handleAddToCart = (product: IProduct) => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect if not authenticated
      return;
    }
    dispatch(addToCart(product));
    toast.success(`added to cart successfully!`);
  };

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error fetching product</p>;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Product Details Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{product?.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product image */}
          <div className="md:w-1/2 w-full">
            <img
              src={product.image}
              className="rounded-md w-full h-auto"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">{product?.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${product?.price}
              {product?.oldPrice && (
                <s className="ml-2">${product?.oldPrice}</s>
              )}
            </p>
            <p className="text-gray-400 mb-4">{product?.description}</p>

            {/* additional product info */}
            <div className="flex flex-col space-y-2">
              <p>
                <strong className="mr-1">Category:</strong> {product?.category}
              </p>
              <p>
                <strong className="mr-1">Color:</strong>
                {product?.color}
              </p>
              <div className="flex gap-1 items-center">
                <strong className="mr-1">Rating: </strong>
                <RatingStars rating={product.averageRating} />
              </div>
            </div>

            <button
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
              onClick={(e) => {
                e.stopPropagation(); // Prevents the parent div click event
                handleAddToCart(product);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </section>

      {/* display reviews */}
      <section className="section__container mt-8">
        <Reviews productReviews={product.reviews} />
      </section>
    </>
  );
};

export default Product;
