import React, { useEffect, useState } from 'react'
import { Checkbox } from "@nextui-org/checkbox";
import './taskbox.css'

function TaskBox({ title, body, userColor, isCompleted, _id }) {
    const [color, changeColor] = useState("gray")
    useEffect(() => {
        console.log('usercolor : ', userColor, 'and color : ', color);

        if (userColor !== undefined) {
            changeColor(userColor)
        }
    }, [])
    return (
        <div className='max-w-3xl '>
            <div className={`box inline-flex flex-col border-2 border-${color}-700  p-3 rounded-lg solid-shadow`}>
                <Checkbox size="md" radius='full' color='secondary'>
                    <p className='text-xl font-bold'>Task Title</p>
                    <p className="description-body font-medium">Some description o Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis mollitia rem re. f the task. Lorem ipsum dolor sit, amet consectetur aerum.</p>
                </Checkbox>

            </div>
        </div>
        
    )
}

export default TaskBox