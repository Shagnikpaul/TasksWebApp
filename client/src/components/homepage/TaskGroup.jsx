
import PropTypes from 'prop-types'
import TaskBox from './TaskBox'
import { Reorder } from 'framer-motion'
import { useEffect, useState } from 'react'


function TaskGroup({ taskList, category, completeTask, updateTaskListFunction, allCategories, setTaskList }) {
    const [tasks, setTasks] = useState([1, 2, 3, 4])
    useEffect(() => {
        setTasks(taskList)
        console.log('reorder list initial : ', tasks);

    }, [taskList])
    return (
        <>
            <div className='p-4'>
                <Reorder.Group
                    axis="y"
                    onReorder={setTasks}
                    values={tasks}
                >
                    <p className='mb-5'>
                        {category['category_name']}
                    </p>
                    {tasks.map((item) => (
                        <Reorder.Item key={item['_id']} value={item}>
                            <TaskBox
                                taskCategory={category}
                                completeTask={completeTask}
                                updateTaskList={updateTaskListFunction}
                                taskData={item}
                                allCategories={allCategories}>
                            </TaskBox>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </>
    )
}

TaskGroup.propTypes = {
    taskList: PropTypes.array,
    category: PropTypes.object.isRequired,
    completeTask: PropTypes.func,
    updateTaskListFunction: PropTypes.func,
    allCategories: PropTypes.array.isRequired
}

export default TaskGroup
