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
     })
  }),
});

export const {
  useSaveLectureProgressMutation,
  useGetCompletedLectureQuery
} = lecturProgressApi;
