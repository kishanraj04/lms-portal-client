import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
        })
    })
})

export const {useGetAllCoursesQuery} = courseApi