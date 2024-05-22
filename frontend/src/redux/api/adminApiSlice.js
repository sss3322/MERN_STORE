

import { apiSlice } from "./apiSlice";
import { ADMIN_URL } from "../constants";


export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    adminRegister: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    adminProfile: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
      }),
      providesTags: ["Admin"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAdminRegisterMutation,
  useAdminProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = adminApiSlice;
