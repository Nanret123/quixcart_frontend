import React from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/features/auth/authSlice";
import FlutterwavePayment from "@/components/FlutterPayment";

const CartTotal = ({ selectedAddress }) => {
  const { selectedItems, totalPrice, taxRate, products } = useSelector(
    (store: RootState) => store.cart
  );
  const { user } = useSelector(selectAuth);

  const tax = totalPrice * taxRate;
  const grandTotal = totalPrice + tax;

  return (
    <div className="px-6 py-4 bg-white rounded-lg shadow-md border border-gray-200 w-[40rem]">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
        Order Summary
      </h3>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Selected Items:</span>
          <span className="font-medium">{selectedItems}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Price:</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax ({(taxRate * 100).toFixed(2)}%):</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-semibold text-gray-900">
          <span>Grand Total:</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div>
        {user && (
          <FlutterwavePayment
            amount={parseFloat(grandTotal.toFixed(2))}
            email={user.email}
            firstname={user.firstname}
            phoneNumber={user.phoneNumber}
            deliveryAddress={selectedAddress}
            cartProducts={products}
          />
        )}
      </div>
    </div>
  );
};

export default CartTotal;
