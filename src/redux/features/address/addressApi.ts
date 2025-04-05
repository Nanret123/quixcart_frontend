import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
  reducerPath: "addressApi",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      credentials: "include",
    }),
    tagTypes: ["Addresses"],
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => "/addresses",
      providesTags: ["Addresses"],
    }),
    addAddress: builder.mutation({
      query: (newAddress) => ({
        url: "/addresses",
        method: "POST",
        body: newAddress,
      }),
      invalidatesTags: ["Addresses"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/addresses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Addresses'],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Addresses'],
    }),
  }),
});

export const { useGetAddressesQuery, useAddAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation } = addressApi;
