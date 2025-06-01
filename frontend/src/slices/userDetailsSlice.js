import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetailsByUserId: builder.query({
      query: (id) => ({
        url: `http://localhost:5000/api/userDetails/user/${id}`,
      }),
      keepUnusedDataFor: 5, // keep cache for 5 seconds (optional)
    }),
    createUserDetails: builder.mutation({
      query: (userDetails) => ({
        url: "http://localhost:5000/api/userDetails",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["UserDetails"], // Invalidate the 'UserDetails' tag to refetch data
    }),
    updateUserDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `http://localhost:5000/api/userDetails/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetUserDetailsByUserIdQuery,
  useCreateUserDetailsMutation,
  useUpdateUserDetailsMutation,
} = userApiSlice;
