//import React from 'react'

import { useEffect, useState } from 'react';
import ChipGroup from '../components/homepage/ChipGroup'
import Heading from '../components/homepage/Heading'
import TaskBox from '../components/homepage/TaskBox';
import NavBarTop from '../components/NavBarTop'
import data from '../utils/sample_data';

import { useSelector } from "react-redux";
import { getTasks } from '../api/calls';


// import {Chip} from '../components/homepage/Chip'


export default function HomePage() {
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  const [userTasks, setUserTasks] = useState([])
  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    const userEmail = sessionStorage.getItem("email")
    console.log('id', userId, 'email', userEmail);


    getTasks({ id: userId }, null).then((r) => {

      setUserTasks(r['list'])
      console.log('user tasks', r['list']);
    })
  }, [])





  return (
    <>
      <NavBarTop></NavBarTop>
      <div className='mt-20'>
        <Heading count={9}></Heading>
        <ChipGroup topics={data}></ChipGroup>

        <div className="mt-10 task-group flex justify-center">
          <div className="task-group-box flex flex-col gap-5 ">

            {(userTasks.length === 0) ? "task list is empty" : userTasks.map(v => (<TaskBox key={v['_id']}></TaskBox>))}

            {/* <TaskBox></TaskBox>
            <TaskBox></TaskBox>
            <TaskBox></TaskBox>
            <TaskBox></TaskBox> */}
          </div>

        </div>


      </div>
    </>
  )
}
