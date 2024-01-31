import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/User/user.type";
import { UserToken } from "../../types/User/UserToken.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    register: builder.mutation<void, Partial<User>>({
      query: (user) => ({
        url: "/user",
        method: "post",
        body: user,
      }),
    }),
    login: builder.mutation<UserToken, Partial<User>>({
      query: (userDetails) => ({
        url: "/user/login",
        method: "post",
        body: userDetails,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
