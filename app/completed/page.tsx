"use client"
import React from 'react'
import { useGlobalState } from '../Context/GlobalProvider'
import Tasks from "../Components/Tasks/Tasks"
const completed = () => {
  const {completedTask} = useGlobalState();
  return (
    <Tasks title="Completed Tasks" tasks = {completedTask}/>
  )
}

export default completed