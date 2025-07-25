import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes:["course"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/course/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: "/allCourse",
      }),
      providesTags:["course"]
    }),
    getMyCourses: builder.query({
      query: () => ({
        url: "/me",
      }),
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: "/create",
        body: course,
        method: "POST",
      }),
      invalidatesTags:["course"],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled; // ✅ no parentheses
          toast.success("Course created");
          // do something with data if you need
        } catch (err) {
          toast.error("Failed to create course");
        }
      },
    }),
    getCourseById: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),

    editCourde:builder.mutation({
        query:({id,data})=>({
            url:`/${id}`,
            body:data,
            method:"PUT"
        }),
        invalidatesTags:["course"]
    }),

    uploadLecture:builder.mutation({
      query:({id,formData})=>({
        url:`/upload/lecture/${id}`,
        body:formData,
        method:"POST"
      })
    })
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useEditCourdeMutation,
  useUploadLectureMutation
} = courseApi;
