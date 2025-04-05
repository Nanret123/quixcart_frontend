import { IProductCart } from "@/interfaces";
import {
  useCreateOrderMutation,
  useUpdateOrderPaymentStatusMutation,
} from "@/redux/features/order/orderApi";
import { FlutterWaveButton } from "flutterwave-react-v3";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cart/cartSlice";


const FlutterwavePayment = ({
  amount,
  email,
  firstname,
  phoneNumber,
  cartProducts,
  deliveryAddress,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder] = useCreateOrderMutation();
  const [updateOrderPaymentStatus] = useUpdateOrderPaymentStatusMutation();
  const [paymentConfig, setPaymentConfig] = useState<any>(null); // Store config here
  const [orderCreated, setOrderCreated] = useState(false);

  const handlePayment = async () => {
    try {
       // Prepare the products list by including price for each product
    const products = cartProducts.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
      price: product.price,
    }));

      // 1️Create Order Before Payment
      const { data, error } = await createOrder({
        products,
        shippingAddressId: deliveryAddress._id,
      });

      if (error) {
        toast.error("Failed to create order.");
        return;
      }

      dispatch(clearCart());


      const orderId = data?._id; 
      console.log(orderId);
       setOrderCreated(true);

      // Store Payment Config in State
      setPaymentConfig({
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY, // Replace with your actual key
        tx_ref: `ECOM-${orderId}`, // Unique transaction reference
        amount: amount, // Total amount
        currency: "NGN", // Your currency
        payment_options: "card, mobilemoney, ussd", // Available payment options
        customer: {
          email: email,
          name: firstname,
          phone_number: phoneNumber,
        },
        customizations: {
          title: "QuixCart E-Commerce Store",
          description: "Payment for your order",
          logo: "https://yourstore.com/logo.png", // Replace with your store logo
        },
        callback: async (response: any) => {
          console.log("Payment Response:", response);
          if (response.status === "successful") {
            toast.success("Payment Successful! Your order has been placed.");

            // Update Order Payment Status
            await updateOrderPaymentStatus({ orderId });

            navigate("/orders");
          } else {
            toast.error("Payment Failed! Please try again.");
          }
        },
        onClose: () => {
          console.log("Payment modal closed");
        },
      });
    } catch (err) {
      console.error("Error processing order:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
    {!orderCreated ? (
      <button
        onClick={handlePayment}
        className="bg-blue-600 mt-10 text-white px-4 py-3 rounded-lg hover:bg-blue-700 w-full"
      >
        Proceed to Payment
      </button>
    ) : (
      // Only show the Flutterwave button after the order is created
      paymentConfig && (
        <FlutterWaveButton
          {...paymentConfig}
          className="bg-green-600 mt-4 text-white px-4 py-3 rounded-lg hover:bg-green-700 w-full"
        >
          Pay with Flutterwave
        </FlutterWaveButton>
      )
    )}
  </div>
  );
};

export default FlutterwavePayment;