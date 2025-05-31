import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/userDetails",
      }),
      keepUnusedDataFor: 5, // keep cache for 5 seconds (optional)
    }),
    getUserDetailsByUserId: builder.query({
      query: (id) => ({
        url: `http://localhost:5000/api/userDetails/user/${id}`,
      }),
      keepUnusedDataFor: 5, // keep cache for 5 seconds (optional)
    }),
    updateUserDetails: builder.mutation({
      query: (userDetails) => ({
        url: "http://localhost:5000/api/userDetails",
        method: "PUT",
        body: userDetails,
      }),
      invalidatesTags: ["UserDetails"], // Invalidate the 'UserDetails' tag to refetch data
    }),
    deleteUserDetails: builder.mutation({
      query: (id) => ({
        url: `http://localhost:5000/api/userDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserDetails"], // Invalidate the 'UserDetails' tag to refetch data
    }),
    createUserDetails: builder.mutation({
      query: (userDetails) => ({
        url: "http://localhost:5000/api/userDetails",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["UserDetails"], // Invalidate the 'UserDetails' tag to refetch data
    }),
  }),
});

export const { useGetUserDetailsQuery } = userApiSlice;
