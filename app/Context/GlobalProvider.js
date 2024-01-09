"use client";

import React, { useEffect } from "react";
import { useContext, useState, createContext } from "react";
import themes from "./Theme";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
export const globalContext = createContext();
export const globalUpdateContext = createContext();

function GlobalProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const {user} = useUser();
  const [modal,setModal] = useState();
  const [collapsed,setCollapsed] = useState(false);

  const collapsedMenu = ()=>{
    setCollapsed(!collapsed);
  }
  const openModal=()=>{
    setModal(true);
    };
    const closeModal = ()=>{
      setModal(false);
    }
    const allTasks = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/tasks");
        const sorted = res.data.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        console.log(sorted)
        
        setTasks(sorted);
  
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if(user){
        allTasks();
      }
    }, [user]);

    const deleteTask = async (id)=>{
        try {
          console.log(id);
          const res = await axios.delete(`/api/tasks/${id}`);
          toast.success("Task deleted Successfully");
          allTasks();
        } catch (error) {
          console.log(error);
          toast.error("Some Error Occured");
        }
    }

    const completedTask = tasks.filter((task)=>task.isCompleted===true);
    const importantTask = tasks.filter((task)=>task.isImportant===true);
    const incompleteTask = tasks.filter((task)=>task.isCompleted===false);
    const updateTask = async (task)=>{
      try {
        const res = await axios.put("/api/tasks",task);
        toast.success("Task updated");
        allTasks();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  return (
    <>
    {tasks &&
      <globalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTask,
        importantTask,
        incompleteTask,
        updateTask,
        openModal,
        closeModal,
        modal,
        allTasks,
        collapsed,
        collapsedMenu
      }}
      >
        <globalUpdateContext.Provider>
          <Toaster />
          {children}
        </globalUpdateContext.Provider>
      </globalContext.Provider>
      }
    </>
  );
}
export const useGlobalState = () => useContext(globalContext);
export const useUpdateState = () => useContext(globalUpdateContext);

export default GlobalProvider;
