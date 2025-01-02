import React, { useEffect, useState } from 'react'
import { Checkbox } from "@nextui-org/checkbox";
import './taskbox.css'

function TaskBox({ taskData }) {
    const [color, changeColor] = useState("gray")
    useEffect(() => {
        // console.log('Tasks details - ', 'title', taskData.title, 'body', taskData.body);

        if (taskData.color !== undefined) {
            changeColor(taskData.color)
        }
    }, [])
    return (
        <div className='min-w-[900px]'>
            <div className={`flex flex-col border-2 border-${color}-700 p-3 rounded-lg solid-shadow`}>
                <Checkbox size="md" radius='full' color='secondary'>
                    <p className='text-xl font-bold'>{taskData.title}</p>
                    <p className="description-body font-medium">{taskData.body}</p>
                </Checkbox>

            </div>
        </div>

    )
}

export default TaskBox