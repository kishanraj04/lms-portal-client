import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
export const groupApi = createApi({
  reducerPath: "group",
  tagTypes:["upload"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/group/",
    credentials: "include",
  }),

  endpoints:(builder)=>({
     getGroup:builder.query({
      query:()=>({
        url:"/group",
        method:"GET"
      })
     }),

     getGroupMessage:builder.query({
      query:(groupId)=>({
        url:`/message/${groupId}`,
        method:"GET"
      })
     })
  })
});

export const {
  useGetGroupQuery,
  useGetGroupMessageQuery
} = groupApi;
