import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useGetOrderDetailsQuery } from "@/redux/features/order/orderApi";

export interface Address {
  _id: string;
  streetName: string;
  city: string;
  state: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  nearestLandMark?: string;
  notes?: string;
  user: string;
}

export interface Product {
  productId: any;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  products: Product[];
  shippingAddress: Address;
  totalPrice: number;
  taxAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: string;
}

const OrderDetails = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrderDetailsQuery(orderId);

  if (isLoading) return <p>Loading order details...</p>;

const order = data.order
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Order Details Page</h2>
      </section>
      <section className="section__container">
        <div className="mb-6">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            <span className="capitalize">
              {format(new Date(order.createdAt), "yyyy-MM-dd")}
            </span>
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            <span className="capitalize">{order.status}</span>
          </p>
          <p>
            <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
          </p>
        </div>
        <div>
          {/* Shipping Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p> <strong>Nearest LandMark: </strong>{order.shippingAddress.nearestLandMark}</p>
            <p>
            <strong>City: </strong>{order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p> <strong>Phone Number: </strong>{order.shippingAddress.phoneNumber}</p>
          </div>
        </div>

        {/* Product List */}
        <h2 className="text-xl font-semibold mt-4">Products</h2>
        <div className="border rounded-lg mt-2">
          {order.products.map((product) => (
            <div
              key={product.productId}
              className="flex items-center p-4 border-b last:border-none "
            >
              <img
                src={product.productId.image}
                alt={product.productId.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="ml-4">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">
                  Price: ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 cursor-pointer"
        >
          Back to Orders
        </button>
      </section>
    </>
  );
};

export default OrderDetails;
