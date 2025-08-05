import React from 'react'
import InstructorCourseTable from './InstructorCourseTable'
import { useGetInstructorCourseQuery } from '../../store/api/instructoApi'
import { Box, Typography } from '@mui/material'

export default function EnrolledStudents() {
  const {data,isLoading} = useGetInstructorCourseQuery(undefined,{refetchOnMountOrArgChange:true})
  return (
    <div>
      {
        data?.instructorCourse?.length==0?<Box
        sx={{display:"flex" , justifyContent:"center" , alignItems:"center", height:"50vh"}}><Typography
        
        variant='h6' >No Course Enrollment</Typography></Box>: <InstructorCourseTable courses={data?.instructorCourse} isLoading={isLoading}/>
      }
     
    </div>
  )
}
