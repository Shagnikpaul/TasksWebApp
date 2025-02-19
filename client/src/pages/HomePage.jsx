//import React from 'react'

import { useEffect, useState } from 'react';
import ChipGroup from '../components/homepage/ChipGroup'
import Heading from '../components/homepage/Heading'
import NavBarTop from '../components/NavBarTop'
import { getTasks, getDoneTasks, completeTask, undoTask, getCategories, getCategoryWiseTasks, getSettings } from '../api/calls';
import TaskGroup from '../components/homepage/TaskGroup';
import NewTaskModal from '../components/homepage/NewTaskModal';
import { Progress } from "@heroui/react";




// import {Chip} from '../components/homepage/Chip'





export default function HomePage() {
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  const loading = {
    yes: "visible",
    no: "invisible"
  }
  const [userTasks, setUserTasks] = useState([])
  const [pendingTasks, setPendingTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loadingState, setLoadingState] = useState(loading.no)
  const [allTasks, setAllTasks] = useState([])
  const [settingsData, setSettingsData] = useState({})

  useEffect(() => {
    setLoadingState(loading.yes)
    console.log('reredering ... ');
    const userId = sessionStorage.getItem("id");
    const userEmail = sessionStorage.getItem("email")
    initSettings(userId);
    updateCategories(userId)
    updateTaskData(userId, userEmail).then((r) => {
      console.log("Updated Tasks DATA");
    })

  }, [])





  const initSettings = function (userId) {
    console.log('settings init');
    getSettings(userId).then((r) => {
      if (r['settings']) {
        setSettingsData(r['settings'])
      }
      else {
        console.log('settings data error');
      }
    });
  }


  const updateSettings = function (newSettings) {
    console.log('update function called')
  }



  const updateCategories = function (userId) {
    setLoadingState(loading.yes)
    getCategories(userId).then((r) => {

      if (r['categories'].length !== 0) {
        console.log("categories were updated ... ");
        setCategories(r['categories'])
        updateAllTasks(userId, r['categories'])
      }
      else {
        console.log("No categories are there");
      }
      setLoadingState(loading.no)
    })
  }


  const updateCategoriesOnly = function (userId) {
    setLoadingState(loading.yes)
    getCategories(userId).then((r) => {

      if (r['categories'].length !== 0) {
        console.log("categories were updated ... ");
        setCategories(r['categories'])
      }
      else {
        console.log("No categories are there");
      }
      setLoadingState(loading.no)
    })
  }

  const updateAllTasks = async function (userId, r) {

    const tskss = []
    for (const c of r) {
      //console.log('user id = ', userId, 'cat name', c['category_name']);
      const tsks = await getCategoryWiseTasks(c['_id'], userId)
      //console.log('tsks, ', tsks);
      tskss.push(tsks)
    }
    console.log('total : ', tskss);
    setLoadingState(loading.no)
    setAllTasks(tskss)
  }


  const updateTaskData = async function (userId, userEmail) {

    //console.log('id', userId, 'email', userEmail);
    setLoadingState(loading.yes)
    updateAllTasks(userId, categories).then((r) => {
      getTasks({ id: userId }, null).then((r) => {

        //console.log("r is ",r);


        if (r['message'] === 'tasks') {
          getDoneTasks({ id: userId }).then((re) => {
            setCompletedTasks(re['list'])
            //console.log('completed tasks ', re['list']);

            setUserTasks(r['list'])
            //console.log('user tasks', r['list']);
            setPendingTasks(
              r['list'].filter(o1 => !o1.isCompleted)
            )
            //console.log('pending ', r['list'].filter(o1 => !o1.isCompleted));
            updateCategoriesOnly(userId)
            setLoadingState(loading.no)
          })


        }
        else {
          setUserTasks([])
          setCompletedTasks([])
          setPendingTasks([])

        }
        setLoadingState(loading.no)
      })
    })



  }

  const completeATask = function (taskId, isCompleted) {
    setLoadingState(loading.yes)
    if (isCompleted) {
      const userId = sessionStorage.getItem("id");
      const userEmail = sessionStorage.getItem("email")

      console.log(`running undo on ${taskId}`);
      undoTask({ email: userEmail }, { id: taskId }).then((r) => {
        console.log("Success undo status : ", r);
        updateTaskData(userId, userEmail)
        setLoadingState(loading.no)
      })

    }
    else {
      completeTask({ email: sessionStorage.getItem("email") }, { id: taskId }).then((r) => {
        console.log(`task with id ${taskId} ran update and the result was ${r}`)
        const userId = sessionStorage.getItem("id");
        const userEmail = sessionStorage.getItem("email")
        updateTaskData(userId, userEmail)
        setLoadingState(loading.no)

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
      <div className={`loading flex flex-col ${loadingState}`}>
        <div className='flex flex-col top-auto bottom-0 justify-center '>
          <Progress color='success' isIndeterminate aria-label="Updating Data..." className="" size="sm" />
        </div>
      </div>
      <NavBarTop ></NavBarTop>
      <div className='mt-10 lg:mt-20'>
        <Heading count={pendingTasks.length}></Heading>
        <ChipGroup updateCategoriesCallback={updateCategories} categories={categories}></ChipGroup>


        {/* min-h-[500px] overflow-y-scroll max-h-3.5 */}
        <div className="lg:mt-10  pending-tasks-pane  lg:w-3/6 md:w-3/5 h-[500px] overflow-y-scroll md:ml-auto md:mr-auto lg:ml-auto lg:mr-auto ml-5 mr-5 p-3 md:p-4 lg:p-5 rounded-xl border-zinc-700 border-2 shadow-lg  bg-olive">
          <div className=' pb-8'>
            {
              allTasks.map((t) => {
                const filteredTaskList = t['tasksList'].filter(o1 => !o1.isCompleted)
                if (filteredTaskList === undefined || filteredTaskList.length === 0) {
                  return ""
                }
                else {


                  return <TaskGroup key={t['category']['_id']} category={t['category']} taskList={filteredTaskList} updateTaskListFunction={updateTaskData} completeTask={completeATask} allCategories={categories}>
                  </TaskGroup>
                }

              }
              )
            }
          </div>
        </div>






        {/* <TaskGroup category={{ category_name: 'All Tasks' }} taskList={pendingTasks} completeTask={completeATask} updateTaskListFunction={updateTaskData}></TaskGroup> */}



        <div className='pb-24'>
          <div className="lg:mt-10 mt-8 pending-tasks-pane  lg:w-3/6 md:w-3/5 h-[500px] overflow-y-scroll md:ml-auto md:mr-auto lg:ml-auto lg:mr-auto ml-5 mr-5 p-3 md:p-4 lg:p-5 rounded-xl border-zinc-700 border-2 shadow-lg  bg-olive">
            <div className=' pb-8'>
              {(completedTasks === undefined || completedTasks.length === 0) ? "No Completed Tasks" : <TaskGroup category={{ category_name: 'Completed Tasks' }} taskList={completedTasks} completeTask={completeATask} updateTaskListFunction={updateTaskData} allCategories={categories}></TaskGroup>}

            </div>

          </div>
        </div>



        <div className="fixed bottom-0 min-w-full flex justify-end p-5">
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
