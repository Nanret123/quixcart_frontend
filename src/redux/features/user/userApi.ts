import { IUser } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetUsersParams {
  page: number;
  limit: number;
}

interface GetUsersResponse {
  users: IUser[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}


export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersParams>({
      query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
      transformResponse: (response: any) => ({
        users: response.users,
        totalUsers: response.totalUsers, // Map totalUsers to total
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ _id }) => ({ type: 'Users' as const, _id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],

    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    updateUser: builder.mutation({
      query: ({user}) => ({
        url: `/users/${user._id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id }, 
        { type: "Users", id: "LIST" },
      ],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id }, 
        { type: "Users", id: "LIST" },
      ],
    })
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = userApi;
