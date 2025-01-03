//import React from 'react'

import { useEffect, useState } from 'react';
import ChipGroup from '../components/homepage/ChipGroup'
import Heading from '../components/homepage/Heading'
import NavBarTop from '../components/NavBarTop'
import data from '../utils/sample_data';

import { useSelector } from "react-redux";
import { getTasks, getDoneTasks, completeTask, updateTask } from '../api/calls';
import TaskGroup from '../components/homepage/TaskGroup';


// import {Chip} from '../components/homepage/Chip'


export default function HomePage() {
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  const [userTasks, setUserTasks] = useState([])
  const [pendingTasks, setPendingTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    const userEmail = sessionStorage.getItem("email")

    updateTaskData(userId, userEmail).then((r) => {
      console.log("Updated Tasks DATA");

    })





  }, [])



  const updateTaskData = async function (userId, userEmail) {
    console.log('id', userId, 'email', userEmail);


    getTasks({ id: userId }, null).then((r) => {

      setUserTasks(r['list'])
      console.log('user tasks', r['list']);
      setPendingTasks(
        r['list'].filter(o1 => !o1.isCompleted)

      )
      console.log('pending ', r['list'].filter(o1 => !o1.isCompleted));

    })

    getDoneTasks({ id: userId }).then((r) => {
      setCompletedTasks(r['list'])
      console.log('completed tasks ', r['list']);

    })
  }

  const completeATask = function (taskId, isCompleted) {

    if (isCompleted) {
      console.log("UNDO function where ??? !!! 😡😡😡😡😡😡🤯🤯🤯🤯🤯🤯");

    }
    else {
      completeTask({ email: sessionStorage.getItem("email") }, { id: taskId }).then((r) => {
        console.log(`task with id ${taskId} ran update and the result was ${r}`)
        const userId = sessionStorage.getItem("id");
        const userEmail = sessionStorage.getItem("email")
        updateTaskData(userId, userEmail)
      })
    }

  }

  /**
   * 
   * Now we need to add Tasks group to categorize the tasks like pending tasks and completed tasks for now ....
   * 
   * also need to add radio button functionality to change the completed status of the task but first its better to 
   * make the tasks group...
   * 
   * 
   */


  return (
    <>
      <NavBarTop></NavBarTop>
      <div className='mt-20'>
        <Heading count={pendingTasks.length}></Heading>
        <ChipGroup topics={data}></ChipGroup>

        <TaskGroup category='Pending Tasks' taskList={pendingTasks} updateFunction={completeATask}></TaskGroup>

        <TaskGroup category='Completed Tasks' taskList={completedTasks} updateFunction={completeATask}></TaskGroup>



        {/* Boiler plate for taskgroup...*/}

        {/* <div className="mt-10 task-group flex justify-center">
          <div className="task-group-box flex flex-col gap-5 ">

            {(userTasks.length === 0) ? "task list is empty" : userTasks.map(v => (<TaskBox taskData={v} key={v['_id']} ></TaskBox>))}

            
          </div>

        </div> */}


      </div>
    </>
  )
}
