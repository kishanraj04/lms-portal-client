import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3000/api/v1/user/"
    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(data)=>({
                url:"/register",
                body:data,
                method:"POST",
                credentials:"include"
            })
        })
    })
})

export const {useRegisterUserMutation} = userApi