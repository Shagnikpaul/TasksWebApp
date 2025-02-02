
import PropTypes from 'prop-types'
import TaskBox from './TaskBox'
import { useState } from 'react';
import { Reorder } from 'framer-motion'


function TaskGroup({ taskList, category, completeTask, updateTaskListFunction, allCategories, setTaskList }) {
    return (
        <>
            <div className= {`mt-10 task-group flex justify-center`}>
                <div className="parent-group">
                    <div className="group-category flex flex-col gap-5">
                        <p className='text-lg  inline-flex'>{category['category_name']}</p>
                        <div className="task-group-boxes flex flex-col gap-5 min-w-[900px]">
                        
                            {(taskList === undefined || taskList.length === 0) ? 
                            <p className='text-center text-2xl opacity-25'>{`Empty ...`}</p> : 
                            taskList.map(v =>(
                            <Reorder.Group values  = {taskList} onReorder ={updateTaskListFunction}>    
                            <Reorder.Item item = {v} key = {v}>
                            <TaskBox  taskCategory={category} completeTask={completeTask} updateTaskList={updateTaskListFunction} taskData={v} key={v['_id']} allCategories={allCategories}></TaskBox>
                            </Reorder.Item>
                            </Reorder.Group>  ))
                            
                            }
                        
                        </div>
                    </div>
                </div>


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
