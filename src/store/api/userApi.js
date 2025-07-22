import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {logoutUser, setUser} from "../slice/userSlice"
import {toast} from 'react-toastify'
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
                method:"GET",
                keepUnusedDataFor: 0,
            })
        }),
        logoutUser:builder.query({
            query:()=>({
                url:"logout",
                credentials:"include"
            }),
            async onQueryStarted(args,{queryFulfilled,dispatch}){
                const {data} =await queryFulfilled
                if(data?.success){
                    dispatch(logoutUser())
                    toast.success(data?.message)
                }
            }
        }),
        updateUserProfile:builder.mutation({
            query:(data)=>({
                query:"/update/profile",
                credentials:"include",
                body:data,
                method:"PUT"
            })
        })
    })
})

export const {useRegisterUserMutation,useLoginUserMutation,useDirectLoginQuery,useLazyLogoutUserQuery,useUpdateUserProfileMutation} = userApi