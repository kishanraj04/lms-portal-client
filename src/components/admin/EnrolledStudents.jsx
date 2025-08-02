import React from 'react'
import InstructorCourseTable from './InstructorCourseTable'
import { useGetInstructorCourseQuery } from '../../store/api/instructoApi'

export default function EnrolledStudents() {
  const {data,isLoading} = useGetInstructorCourseQuery(undefined,{refetchOnMountOrArgChange:true})
  return (
    <div>
      {
        data?.instructorCourse?.length==0?<Box>No Course Enrollment</Box>: <InstructorCourseTable courses={data?.instructorCourse} isLoading={isLoading}/>
      }
     
    </div>
  )
}
