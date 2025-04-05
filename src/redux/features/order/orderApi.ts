import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    updateOrderPaymentStatus: builder.mutation({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: { status: "paid" },
      }),
    }),
    getAllOrders: builder.query({
      query: () => '/orders',
    }),
    getOrderDetails: builder.query({
      query: (orderId) => `/orders/${orderId}`,
    }),
  })
})

export const { useCreateOrderMutation, useUpdateOrderPaymentStatusMutation, useGetAllOrdersQuery, useGetOrderDetailsQuery } = orderApi;