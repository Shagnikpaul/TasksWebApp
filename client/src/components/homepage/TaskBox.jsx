import React, { useEffect, useState } from 'react'
import { Checkbox } from "@nextui-org/checkbox";
import './taskbox.css'
import { Tooltip, Button } from "@nextui-org/react";

import { IconDelete } from './../icons/DeleteIcon'
import { deleteTask, updateTask } from '../../api/calls';


function TaskBox({ taskData, updateFunction, updateTaskList }) {
    const [color, changeColor] = useState("gray")
    const [deleteIconVisible, setDeleteIconVisible] = useState("invisible")
    useEffect(() => {
        // console.log('Tasks details - ', 'title', taskData.title, 'body', taskData.body);

        if (taskData.color !== undefined) {
            changeColor(taskData.color)
        }
    }, [])


    function onHoverE(taskId) {
        //console.log(`${taskId} is being hovered on`);
        setDeleteIconVisible("visible")
    }

    function onHoverL(taskId) {
        //console.log(`${taskId} is being hovered off`);
        setDeleteIconVisible("invisible")
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

                <Checkbox isSelected={taskData.isCompleted} size="md" radius='full' color='secondary' onClick={() => {
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

                <Tooltip content="Delete?" color='danger' className='font-inter text-sm' offset={10} placement='left'>
                    <div className="flex flex-col justify-center ">

                        <Button isIconOnly className={`${deleteIconVisible} bg-red-500/1`} onClick={() => {
                            deleteTaskCall(taskData._id)
                        }}>
                            <IconDelete />
                        </Button>
                    </div>
                </Tooltip>
            </div>
        </div>

    )
}

export default TaskBox