import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {setUser} from "../slice/userSlice"
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
        }),
        loginUser:builder.mutation({
            query:(data)=>({
                url:"login",
                method:"POST",
                credentials:"include",
                body:data
            }),
            async onQueryStarted(args,{queryFulfilled,dispatch}){
                const {data} =await queryFulfilled
                dispatch(setUser(data))
            }
        }),
        directLogin:builder.query({
            query:()=>({
                url:"directlogin",
                credentials:"include",
                method:"GET"
            })
        })
    })
})

export const {useRegisterUserMutation,useLoginUserMutation,useDirectLoginQuery} = userApi