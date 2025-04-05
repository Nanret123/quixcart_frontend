import { clearCart } from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummary: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { selectedItems, totalPrice, taxRate } = useSelector(
    (store: RootState) => store.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tax = totalPrice * taxRate;
  const grandTotal = totalPrice + tax;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = () => {
    onClose();
    navigate("/place-order");
  };

  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">Order Summary</h2>
        <p>Selected Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>
          Tax ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <p className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>
        <div className="px-4 mb-6 cursor-pointer">
          {/* Buttons Section */}
          <div className="space-y-2">
            <button
              className="bg-red-500 px-3 py-1.5 text-white rounded-md flex justify-between items-center gap-2 hover:bg-red-600 transition"
              onClick={handleClearCart}
            >
              Clear cart <i className="ri-delete-bin-7-line text-xl"></i>
            </button>

            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 px-3 py-1.5 text-white rounded-md flex justify-between items-center gap-2 hover:bg-green-700 transition"
            >
              Proceed To Checkout <i className="ri-bank-card-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
