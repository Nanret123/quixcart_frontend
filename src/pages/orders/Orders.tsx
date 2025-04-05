import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Orders = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery({});
  
  const statusColors = {
    pending: "bg-yellow-500",
    paid: "bg-blue-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };
  
  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to load orders</p>;

  const orders = data?.orders ?? [];


  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Orders Page</h2>
      </section>
      <section className="section__container">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3">{order._id}</td>
                  <td className="px-6 py-3">{format(new Date(order.createdAt), "yyyy-MM-dd")}</td>
                  <td className="px-6 py-3">{order.totalPrice}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-white px-3 py-1 rounded-full text-sm 
                        ${ statusColors[order.status as keyof typeof statusColors] || "bg-gray-500"}
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <Link to={`/orders/${order._id}`} className="text-blue-500 hover:underline cursor-pointer">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Orders;
