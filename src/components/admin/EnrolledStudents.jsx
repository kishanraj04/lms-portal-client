import React from 'react'
import InstructorCourseTable from './InstructorCourseTable'
import { useGetInstructorCourseQuery } from '../../store/api/instructoApi'

export default function EnrolledStudents() {
  const {data} = useGetInstructorCourseQuery()
  return (
    <div>
      {
        data?.instructorCourse?.length==0?<Box>No Course Enrollment</Box>: <InstructorCourseTable courses={data?.instructorCourse}/>
      }
     
    </div>
  )
}
