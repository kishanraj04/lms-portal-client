import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
export const lecturProgressApi = createApi({
  reducerPath: "lecturprogress",
  tagTypes:["complete"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/lectureprogress/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
     saveLectureProgress:builder.mutation({
        query:(data)=>({
            url:"/lecture/progress",
            method:"POST",
            body:data
        }),
        invalidatesTags:["complete"]
     }),

     getCompletedLecture:builder.query({
      query:(courseId)=>({
        url:`/lecture/pregress/completed/${courseId}`,
        method:"GET"
      }),
      providesTags:["complete"]
     }),

     instructorCourseWithPrice:builder.query({
      query:()=>({
        url:"/instructorcourse/with-price",
        method:"GET"
      })
     }),

     courseWithEnrolledStudent:builder.query({
      query:()=>({
        url:"/course/with-enrolled-student",
        method:"GET"
      })
     }),

     getMonthRevenue:builder.query({
      query:()=>({
        url:"/month/revenue",
        method:"GET"
      })
     })
  }),
});

export const {
  useSaveLectureProgressMutation,
  useGetCompletedLectureQuery,
  useInstructorCourseWithPriceQuery,
  useCourseWithEnrolledStudentQuery,
  useGetMonthRevenueQuery
} = lecturProgressApi;
