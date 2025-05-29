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
    }),
});
 export const { useLoginMutation } = usersApiSlice;
 