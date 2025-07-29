import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
export const lecturProgressApi = createApi({
  reducerPath: "lecturprogress",
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
        })
     }),

     getCompletedLecture:builder.query({
      query:(courseId)=>({
        
      })
     })
  }),
});

export const {
  useSaveLectureProgressMutation
} = lecturProgressApi;
