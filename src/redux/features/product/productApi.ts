import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Products", "Reviews"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({
        page = 1,
        limit = 10,
        category,
        color,
        minPrice,
        maxPrice,
      }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (category && category !== "all") params.append("category", category);
        if (color && color !== "all") params.append("color", color);
        if (minPrice) params.append("minPrice", minPrice.toString());
        if (maxPrice) params.append("maxPrice", maxPrice.toString());

        return `products?${params.toString()}`; // Construct the query URL
      },
      providesTags: [{ type: "Products", id: "LIST" }],

    }),
    getOneProduct: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Products", id: result?._id || productId },
        { type: "Reviews", id: result?._id || productId },
      ],
    }),
    addOneProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"]
    }),
    updateProduct: builder.mutation({
      query: (product ) => ({
        url: `/products/${product._id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Products", id: productId }],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"]
    }),
    getRelatedProducts: builder.query({
      query: (productId) => `/products/related?productId=${productId}`,
      providesTags: ["Products"], // Refresh if products update
    }),
    getTrendingProducts: builder.query({
      query: () => `/products/trending`,
      providesTags: ["Products"] // Refresh if products update
    })
  }),
});

export const { useGetAllProductsQuery, useAddOneProductMutation, useGetOneProductQuery, useDeleteProductMutation, useGetRelatedProductsQuery, useUpdateProductMutation, useGetTrendingProductsQuery } = productApi; // Auto-generated hook
