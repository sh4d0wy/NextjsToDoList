"use client"
import React from 'react'
import Tasks from "../Components/Tasks/Tasks"
import { useGlobalState } from '../Context/GlobalProvider'
const page = () => {
  const {importantTask} = useGlobalState();
  return (
    <Tasks title ="Important Tasks" tasks = {importantTask}/>
    )
}

export default page