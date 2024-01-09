"use client"
import Tasks from "../Components/Tasks/Tasks"
import React from 'react'
import { useGlobalState } from "../Context/GlobalProvider"

const page = () => { 
  const {incompleteTask} = useGlobalState();
  return (
    <Tasks title = "Incomplete Tasks" tasks={incompleteTask}/>
  )
}

export default page