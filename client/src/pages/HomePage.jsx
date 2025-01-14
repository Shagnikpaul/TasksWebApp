//import React from 'react'

import { useEffect, useState } from 'react';
import ChipGroup from '../components/homepage/ChipGroup'
import Heading from '../components/homepage/Heading'
import NavBarTop from '../components/NavBarTop'
import data from '../utils/sample_data';

import { useSelector } from "react-redux";
import { getTasks, getDoneTasks, completeTask, undoTask, getCategories, getCategoryWiseTasks } from '../api/calls';
import TaskGroup from '../components/homepage/TaskGroup';
import NewTaskModal from '../components/homepage/NewTaskModal';


// import {Chip} from '../components/homepage/Chip'


export default function HomePage() {
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  const [userTasks, setUserTasks] = useState([])
  const [pendingTasks, setPendingTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [categories, setCategories] = useState([])

  const [allTasks, setAllTasks] = useState([])


  useEffect(() => {
    console.log('reredering ... ');
    const userId = sessionStorage.getItem("id");
    const userEmail = sessionStorage.getItem("email")



    getCategories(userId).then((r) => {

      if (r['categories'].length !== 0) {
        console.log("categories were updated ... ");
        setCategories(r['categories'])
        updateAllTasks(userId, r['categories'])
      }
      else {
        console.log("No categories are there");
      }
    })
    updateTaskData(userId, userEmail).then((r) => {
      console.log("Updated Tasks DATA");

    })


  }, [])








  const updateAllTasks = async function (userId, r) {
    const tskss = []
    for (const c of r) {
      console.log('user id = ', userId, 'cat name', c['category_name']);
      const tsks = await getCategoryWiseTasks(c['_id'], userId)
      //console.log('tsks, ', tsks);
      tskss.push(tsks)
    }
    //console.log('total : ', tskss);

    setAllTasks(tskss)
  }


  const updateTaskData = async function (userId, userEmail) {
    console.log('id', userId, 'email', userEmail);
    updateAllTasks(userId, categories).then((r) => {
      getTasks({ id: userId }, null).then((r) => {

        //console.log("r is ",r);


        if (r['message'] === 'tasks') {
          getDoneTasks({ id: userId }).then((re) => {
            setCompletedTasks(re['list'])
            console.log('completed tasks ', re['list']);

            setUserTasks(r['list'])
            console.log('user tasks', r['list']);
            setPendingTasks(
              r['list'].filter(o1 => !o1.isCompleted)
            )
            console.log('pending ', r['list'].filter(o1 => !o1.isCompleted));

          })


        }
        else {
          setUserTasks([])
          setCompletedTasks([])
          setPendingTasks([])
        }
      })
    })



  }

  const completeATask = function (taskId, isCompleted) {

    if (isCompleted) {
      const userId = sessionStorage.getItem("id");
      const userEmail = sessionStorage.getItem("email")

      console.log(`running undo on ${taskId}`);
      undoTask({ email: userEmail }, { id: taskId }).then((r) => {
        console.log("Success undo status : ", r);
        updateTaskData(userId, userEmail)

      })

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
        <ChipGroup categories={categories}></ChipGroup>





        {
          allTasks.map(t =>
            <TaskGroup key={t['category']['_id']} category={t['category']} taskList={t['tasksList'].filter(o1 => !o1.isCompleted)} updateTaskListFunction={updateTaskData} completeTask={completeATask} allCategories={categories}>
            </TaskGroup>)
        }




        <TaskGroup category={{ category_name: 'All Tasks' }} taskList={pendingTasks} completeTask={completeATask} updateTaskListFunction={updateTaskData}></TaskGroup>

        <TaskGroup category={{ category_name: 'Completed Tasks' }} taskList={completedTasks} completeTask={completeATask} updateTaskListFunction={updateTaskData}></TaskGroup>





        <div className="buttonlow flex justify-center py-20">
          <NewTaskModal currentCategories={categories} updateFunction={updateTaskData} userId={sessionStorage.getItem("id")} userEmail={sessionStorage.getItem("email")}></NewTaskModal>
        </div>


        {/* Boiler plate for taskgroup...*/}

        {/* <div className="mt-10 task-group flex justify-center">
          <div className="task-group-box flex flex-col gap-5 ">

            {(userTasks.length === 0) ? "task list is empty" : userTasks.map(v => (<TaskBox taskData={v} key={v['_id']} ></TaskBox>))}

            jj
          </div>

        </div> */}


      </div>
    </>
  )
}
