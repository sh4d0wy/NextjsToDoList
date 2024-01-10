"use client"
import Image from 'next/image'
import Tasks from './Components/Tasks/Tasks'
import { useGlobalState } from './Context/GlobalProvider'
export default function Home() {
  const { tasks } = useGlobalState();
  return(
    <>
    <Tasks title="All Tasks" tasks={tasks} />
    </>
  )
}