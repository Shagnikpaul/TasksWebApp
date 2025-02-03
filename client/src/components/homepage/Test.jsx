import { Reorder } from 'framer-motion'


import React, { useState } from 'react'
import { IconDelete } from '../icons/DeleteIcon'

function Test() {
    const [tasks, setTasks] = useState([1, 2, 3, 4, 5])
    return (
        <div>

            <Reorder.Group
                axis="y"
                onReorder={setTasks}
                layoutScroll
                style={{ overflowY: "scroll" }}
                values={tasks}
            >

                {tasks.map((item) => (
                    <Reorder.Item key={item} value={item}>
                        <IconDelete />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    )
}

export default Test