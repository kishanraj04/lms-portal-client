import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["course", "lecture","review"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/course/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: "/allCourse",
      }),
      providesTags: ["course"],
    }),
    getMyCourses: builder.query({
      query: () => ({
        url: "/me",
      }),
      providesTags: ["course"],
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: "/create",
        body: course,
        method: "POST",
      }),
      invalidatesTags: ["course"],
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

    editCourde: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["course"],
    }),

    uploadLecture: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/upload/lecture/${id}`,
        body: formData,
        method: "POST",
      }),
      invalidatesTags: ["lecture"],
    }),

    getLectureVedioInstructor: builder.query({
      query: (courseId) => ({
        url: `/getlecture/instructor/${courseId}`,
        method: "GET",
      }),
      providesTags: ["lecture"],
    }),

    deleteLecture: builder.mutation({
      query: ({ lectureId, public_id }) => ({
        url: `/delete/lecture/${lectureId}`,
        method: "DELETE",
        body: { public_id },
      }),
      invalidatesTags: ["lecture"],
    }),

    getSingleLecture: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),

    updateLecture: builder.mutation({
      query: ({ lectureId, formData }) => ({
        url: `/updata/lecture/${lectureId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    makeCoursePublic: builder.mutation({
      query: ({ courseId, isPublish }) => ({
        url: `/publishthecourse/${courseId}`,
        body: { isPublish: isPublish },
        method: "PUT",
      }),
      invalidatesTags: ["course"],
    }),

    makeCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        body: { courseId },
        method: "POST",
      }),
    }),

    getCourseWithPurchaseStatus: builder.query({
      query: (courseId) => ({
        url: `/course/course-purchase-status/${courseId}`,
        method: "GET",
      }),
    }),

    searchCourse: builder.query({
      query: (name) => ({
        url: `/course/${name}`,
        method: "GET",
      }),
    }),

    userLearningProgress: builder.query({
      query: () => ({
        url: `/course/learning/progress`,
      }),
    }),

    exploreCourses: builder.query({
      query: () => ({
        url: "/explore/courses",
        method: "GET",
      }),
    }),

    myEnrolledCourse: builder.query({
      query: () => ({
        url: "/me/enrolled-course",
        method: "GET",
      }),
    }),

    giveFeedBack: builder.mutation({
      query: (data) => ({
        url: "/cours/feedback",
        method: "POST",
        body: data,
      }),
    }),

    getReview: builder.query({
      query: (courseId) => ({
        url: `/course/review/${courseId}`,
        method: "GET",
      }),
    }),

    getCourseReviewById: builder.query({
      query: (courseId) => ({
        url: `/course/all-review/${courseId}`,
        method: "GET",
      }),
      providesTags:["review"]
    }),

    updateReview: builder.mutation({
      query: ({ selectedReviewId, data }) => ({
        url: `/course/update/review/${selectedReviewId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags:["review"]
    }),

    deleteReview:builder.mutation({
      query:(reviewId)=>({
        url:`/course/delete-review/${reviewId}`,
        method:"DELETE"
      }),
      invalidatesTags:["review"]
    })
  }),
});

export const {
  useGetAllCoursesQuery,
  useLazySearchCourseQuery,
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useEditCourdeMutation,
  useUploadLectureMutation,
  useGetLectureVedioInstructorQuery,
  useDeleteLectureMutation,
  useGetSingleLectureQuery,
  useUpdateLectureMutation,
  useMakeCoursePublicMutation,
  useMakeCheckoutSessionMutation,
  useGetCourseWithPurchaseStatusQuery,
  useUserLearningProgressQuery,
  useExploreCoursesQuery,
  useMyEnrolledCourseQuery,
  useGiveFeedBackMutation,
  useGetReviewQuery,
  useGetCourseReviewByIdQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} = courseApi;
