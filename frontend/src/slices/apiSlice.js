import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',  // <--- add this to send cookies on requests
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['UserDetails', 'User'],
  endpoints: (builder) => ({}),
});