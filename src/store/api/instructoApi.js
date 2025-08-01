import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
export const instructorApi = createApi({
  reducerPath: "instructorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/instructor/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getInstructorCourse:builder.query({
        query:()=>({
            url:"/instructor-course",
            method:"GET"
        })
    }),

    getEnrolledStudentInSpecificCourse:builder.query({
        query:(courseId)=>({
             url:`/instructor/course/enrolled/${courseId}`,
             method:"GET"
        })
    })
  }),
});

export const {
    useGetInstructorCourseQuery,
    useGetEnrolledStudentInSpecificCourseQuery
} = instructorApi;
