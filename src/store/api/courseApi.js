import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {toast} from 'react-toastify'
export const courseApi = createApi({
    reducerPath:"courseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3000/api/v1/course/",
        credentials:"include"
    }),

    endpoints:(builder)=>({
        getAllCourses:builder.query({
            query:()=>({
                url:"/allCourse",
            })
        }),
        getMyCourses:builder.query({
            query:()=>({
                url:"/me"
            })
        }),
        createCourse:builder.mutation({
            query:(course)=>({
                url:"/create",
                body:course,
                method:"POST"
            }),
           async onQueryStarted(args,{queryFulfilled}){
            toast.success("course created")
           }
        })
    })
})

export const {useGetAllCoursesQuery,useGetMyCoursesQuery,useCreateCourseMutation} = courseApi