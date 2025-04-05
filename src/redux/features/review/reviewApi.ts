import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Products","Reviews"],
  endpoints: (builder) => ({
    createOrUpdateReview: builder.mutation({
      query: (review) => ({
        url: `/products/${review.productId}/reviews`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: productId },
        { type: "Products", id: productId }, // Ensure product details are updated
      ],
    }),
    getProductReviews: builder.query({
      query: (productId) => `/products/${productId}/reviews`,
      providesTags: (result, error, productId) =>
        result ? [{ type: "Reviews", id: productId }] : [],
    }),
    getReviewCount: builder.query({
      query: (productId) => `/products/${productId}/reviews/total`,
    }),
    getUserReviews: builder.query({
      query: () => `/reviews/user`,
      providesTags: [{ type: "Reviews", id: "USER" }],
    }),
    getUserReview: builder.query({
      query: (productId) => `/products/${productId}/reviews/user`,
      transformResponse: (response) => response.review || null,
    })
  }),
});

export const {
  useCreateOrUpdateReviewMutation,
  useGetProductReviewsQuery,
  useGetReviewCountQuery,
  useGetUserReviewsQuery,
  useGetUserReviewQuery
} = reviewApi;
