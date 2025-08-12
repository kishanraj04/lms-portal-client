import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
export const groupApi = createApi({
  reducerPath: "group",
  tagTypes: ["grantMsg"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/group/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getGroup: builder.query({
      query: () => ({
        url: "/group",
        method: "GET",
      }),
    }),

    getGroupMessage: builder.query({
      query: (groupId) => ({
        url: `/message/${groupId}`,
        method: "GET",
      }),
    }),

    getMyGroup: builder.query({
      query: () => ({
        url: "/group/me",
        method: "GET",
      }),
     
    }),

    getStudentOfGroup: builder.query({
      query: (groupId) => ({
        url: `group/student/${groupId}`,
        method: "GET",
      }),
       providesTags:["grantMsg"]
    }),

    stopUserFromSendingTheMsg: builder.mutation({
      query: ({studentId,groupId}) => ({
        url: `/stop/user-msg/${studentId}`,
        method: "PUT",
        body:{groupId:groupId}
      }),
      invalidatesTags:["grantMsg"]
    }),

    allowUserFromSendingTheMsg: builder.mutation({
      query: ({studentId,groupId}) => ({
        url: `/allow/user-msg/${studentId}`,
        method: "PUT",
        body:{groupId:groupId}
      }),
      invalidatesTags:["grantMsg"]
    }),
  }),
});

export const {
  useGetGroupQuery,
  useGetGroupMessageQuery,
  useGetMyGroupQuery,
  useGetStudentOfGroupQuery,
  useStopUserFromSendingTheMsgMutation,
  useAllowUserFromSendingTheMsgMutation
} = groupApi;
