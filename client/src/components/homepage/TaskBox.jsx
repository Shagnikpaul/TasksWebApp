import React, { useEffect, useState } from 'react'
import { Checkbox } from "@nextui-org/checkbox";
import './taskbox.css'
import { Tooltip, Button } from "@nextui-org/react";

import { IconDelete } from './../icons/DeleteIcon'

import { deleteTask, updateTask } from '../../api/calls';
import { EditIcon } from '../icons/EditIcon';


function TaskBox({ taskData, updateFunction, updateTaskList }) {
    const [color, changeColor] = useState("gray")
    const [IconVisible, setIconVisible] = useState("invisible")
    useEffect(() => {
        // console.log('Tasks details - ', 'title', taskData.title, 'body', taskData.body);

        if (taskData.color !== undefined) {
            changeColor(taskData.color)
        }
    }, [])


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
            console.log(`task[${taskId}] successfully deleted with status ${r}`)
            updateTaskList(sessionStorage.getItem("id"), sessionStorage.getItem("email"))
        })
    }


    return (
        <div className='min-w-[900px]' onMouseEnter={() => {
            onHoverE(taskData._id)
        }} onMouseLeave={() => {
            onHoverL(taskData._id)
        }}>
            <div className={`flex flex-row justify-between border-2 border-${color}-700 p-3 rounded-lg solid-shadow`}>

                <Checkbox isSelected={taskData.isCompleted} size="md" radius='full' color='secondary' onChange={() => {
                    console.log(`Task ${taskData._id} was clicked !!`);
                    if (updateFunction !== undefined && !taskData.isCompleted) {
                        updateFunction(taskData._id, false);
                    }
                    else if (updateFunction !== undefined && taskData.isCompleted) {
                        console.log("Nuh Uh task was already completed so we undo it 😈😈😈😈... ");
                        updateFunction(taskData._id, true)

                    }
                }}>
                    <div className="txt-grp px-2">
                        <p className='text-lg font-semibold'>{taskData.title}</p>
                        <p className="description-body text-md opacity-65   ">{taskData.body}</p>
                    </div>

                </Checkbox>

                <div className="centre-vertically flex flex-col justify-center">
                    <div className="flex">
                        <Tooltip content="Edit task" color='primary' className='font-inter text-sm' closeDelay={100} offset={10} placement='left'>
                            <Button isIconOnly className={`${IconVisible} bg-red-500/1`} onClick={() => {
                                console.log("Edit for ", taskData._id);

                            }}>
                                <EditIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip  content="Delete task" color='danger' className='font-inter text-sm' closeDelay={100} offset={15} placement='bottom'>
                            <Button isIconOnly className={`${IconVisible} bg-red-500/1`} onClick={() => {
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