import React, { useEffect, useState } from 'react'
import { Checkbox } from "@nextui-org/checkbox";
import './taskbox.css'

function TaskBox({ taskData, updateFunction }) {
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
                <Checkbox isSelected={taskData.isCompleted} size="md" radius='full' color='secondary' onClick={() => {
                    console.log(`Task ${taskData._id} was clicked !!`);
                    if (updateFunction !== undefined && !taskData.isCompleted) {
                        updateFunction(taskData._id, false);
                    }
                    else if(updateFunction !== undefined && taskData.isCompleted) {
                        console.log("Nuh Uh task was already completed so we undo it 😈😈😈😈... ");
                        updateFunction(taskData._id, true)    
                        
                    }
                }}>
                    <p className='text-xl font-bold'>{taskData.title}</p>
                    <p className="description-body font-medium">{taskData.body}</p>
                </Checkbox>

            </div>
        </div>

    )
}

export default TaskBox