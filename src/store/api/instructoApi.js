import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
export const instructorApi = createApi({
  reducerPath: "instructorApi",
  tagTypes:["upload"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/instructor/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getInstructorCourse: builder.query({
      query: () => ({
        url: "/instructor-course",
        method: "GET",
      }),
    }),

    getEnrolledStudentInSpecificCourse: builder.query({
      query: (courseId) => ({
        url: `/instructor/course/enrolled/${courseId}`,
        method: "GET",
      }),
    }),

    uploadResourses: builder.mutation({
      query: (formData) => ({
        url: "/instructor/course/upload-resources",
        method: "POST",
        body: formData,
        
      }),
      invalidatesTags:["upload"]
    }),

    getAllResources:builder.query({
      query:(courseId)=>({
        url:`/instructor/all-resources/${courseId}`,
        method:"GET",
      }),
      providesTags:["upload"]
    })
  }),
});

export const {
  useGetInstructorCourseQuery,
  useGetEnrolledStudentInSpecificCourseQuery,
  useUploadResoursesMutation,
  useGetAllResourcesQuery
} = instructorApi;
