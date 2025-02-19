import React, { useEffect, useState } from 'react'
import { Checkbox } from "@heroui/checkbox";
import './taskbox.css'
import { Tooltip, Button, Spacer } from "@heroui/react";

import { IconDelete } from './../icons/DeleteIcon'

import { deleteTask, updateTask } from '../../api/calls';
import { EditIcon } from '../icons/EditIcon';
import EditTaskModal from './EditTaskDrawer';


function TaskBox({ taskData, completeTask, updateTaskList, allCategories, taskCategory }) {
    const [color, changeColor] = useState("green")
    const [IconVisible, setIconVisible] = useState("invisible")
    const [taskTitle, setTaskTitle] = useState("Loading")
    const [taskDescription, setTaskDescription] = useState("Loading")

    useEffect(() => {
        // console.log('Tasks details - ', 'title', taskData.title, 'body', taskData.body);
        setTaskTitle(taskData.title)
        setTaskDescription(taskData.body)

        if (taskCategory['category_color'] !== undefined) {
            changeColor(taskCategory['category_color'])
        }
    }, [])

    const updateTask = function (taskTitle, taskDescription, taskId) {
        console.log('Ran Update function for task : ', taskId);
        setTaskDescription(taskDescription)
        setTaskTitle(taskTitle)
        updateTaskList(sessionStorage.getItem('id'), sessionStorage.getItem('email'))
    }
    function onHoverE(taskId) {
        //console.log(`${taskId} is being hovered on`);
        setIconVisible("visible")
    }

    function onHoverL(taskId) {
        //console.log(`${taskId} is being hovered off`);
        setIconVisible("invisible")
    }

    function deleteTaskCall(taskId) {
        console.log("task delete initiated... for task id", taskId);
        deleteTask({ email: sessionStorage.getItem("email") }, { id: taskId }).then((r) => {
            console.log(`task[${taskId}] deleted with message`, r['message'])

            updateTaskList(sessionStorage.getItem("id"), sessionStorage.getItem("email"))
        }).catch((e) => {
            console.log('error while deleting the task');

        })
    }


    return (
        <div className='mb-5' onMouseEnter={() => {
            onHoverE(taskData._id)
        }} onMouseLeave={() => {
            onHoverL(taskData._id)
        }}>
            <div className={`flex flex-row justify-between border-2 border-${color}-400 p-2 lg:p-3 rounded-lg solid-shadow`}>
                <Checkbox isSelected={taskData.isCompleted} size="md" radius='full' color='primary' onChange={() => {
                    console.log(`Task ${taskData._id} was clicked !!`);
                    if (completeTask !== undefined && !taskData.isCompleted) {
                        completeTask(taskData._id, false);
                    }
                    else if (completeTask !== undefined && taskData.isCompleted) {
                        console.log("Nuh Uh task was already completed so we undo it 😈😈😈😈... ");
                        completeTask(taskData._id, true)

                    }
                }}>
                    <div className="txt-grp px-2">
                        <p className='text-sm md:text-md lg:text-lg font-semibold'>{taskTitle}</p>
                        <p className="description-body text-sm lg:text-md opacity-65">{taskDescription}</p>
                    </div>

                </Checkbox>

                <div className="centre-vertically flex flex-col justify-center">
                    <div className="flex">


                        <EditTaskModal updateFunction={updateTask} setIconInvisible={setIconVisible} customStyle={`${IconVisible} bg-red-500/1`} taskData={taskData} currentCategories={allCategories} taskCategory={taskCategory} />
                        {/* <Button isIconOnly className={`${IconVisible} bg-red-500/1`} onPress={() => {
                                console.log("Edit for ", taskData._id);

                            }}>
                                <EditIcon />
                            </Button> */}
                        <Spacer x={2} />
                        <Tooltip content="Delete task" color='danger' className='font-inter text-sm' closeDelay={100} offset={15} placement='bottom'>
                            <Button isIconOnly className={`${IconVisible} bg-red-500/1`} onPress={(e) => {

                                deleteTaskCall(taskData._id)
                            }}>
                                <IconDelete />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TaskBox