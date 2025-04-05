import { IProductCart } from "@/interfaces";
import React from "react";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";

interface ICartModalProps {
  products: IProductCart[];
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<ICartModalProps> = ({
  products,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleQuantity = (id: string, type: string) => {
    dispatch(updateQuantity({ id, type }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ id }));
  };

  if (!isOpen) return null; // Prevents rendering when closed

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black bg-opacity-80 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose} // Clicking outside closes the modal
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="px-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button
              className="text-gray-600 hover:text-gray-500"
              onClick={onClose}
            >
              <i className="ri-xrp-fill bg-black p-1 text-white"></i>
            </button>
          </div>

          {/* cart items */}
          <div className="cart-items">
            {products.length === 0 ? (
              <div>Your Cart is empty</div>
            ) : (
              products.map((product, index) => (
                <div
                  key={product._id}
                  className="flex flex-col md:flex-row items-center shadow-md p-3 md:p-5 mb-4 rounded-lg bg-white min-w-[350px] gap-6 justify-between"
                >
                  <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  {/* Product Details */}
                  <div className="flex flex-row items-center gap-4 w-full">
                    {/* Index Number */}
                    <span className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>

                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt="product image"
                      className="w-16 h-16 object-cover rounded"
                    />

                    {/* Product Name & Price */}
                    <div className="flex flex-col justify-center md:justify-start">
                      <h5 className="text-lg font-medium">{product.name}</h5>
                      <p className="text-gray-600 text-sm">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Remove Section */}
                  <div className="flex flex-col  items-center justify-between w-full gap-4">
                    {/* Quantity Buttons (Will Stack Below Image on Small Screens) */}
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                        onClick={() => handleQuantity(product._id, "DECREMENT")}
                      >
                        -
                      </button>
                      <span className="text-center w-8">
                        {product.quantity}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                        onClick={() => handleQuantity(product._id, "INCREMENT")}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:scale-105 transition-all flex items-center gap-1"
                      onClick={() => handleRemove(product._id)}
                    >
                      <i className="ri-delete-bin-6-line"></i> Remove
                    </button>
                  </div>
                </div>
                </div>
              ))
            )}
          </div>

          {/* calculation */}
          {products.length > 0 && <OrderSummary onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
