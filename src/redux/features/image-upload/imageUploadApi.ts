import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageUploadApi = createApi({
  reducerPath: 'imageUploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/file-upload/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageUploadApi;