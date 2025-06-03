import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'http://localhost:5000/api/users/auth',
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: 'http://localhost:5000/api/users',
                method: 'POST',
                body: data,
            }),
        }),
        editUser: builder.mutation({
            query: (data) => ({
                url: `http://localhost:5000/api/users/profile/${data._id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        getUserProfile: builder.query({
            query: () => ({
              url: 'http://localhost:5000/api/users/profile',
              method: 'GET',
              // REMOVE custom headers if using httpOnly cookies for auth
              // Let browser send the cookie automatically
            }),
            // Ensures cookies are sent with the request
            credentials: 'include',
          }),
        logout: builder.mutation({
            query: () => ({
                url: 'http://localhost:5000/api/users/logout',
                method: 'POST',
            }),
        }),
    }),
});
 export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useEditUserMutation, useGetUserProfileQuery } = usersApiSlice;
 