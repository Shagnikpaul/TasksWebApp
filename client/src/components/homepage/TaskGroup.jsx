
import PropTypes from 'prop-types'
import TaskBox from './TaskBox'


function TaskGroup({ taskList, category, completeTask, updateTaskListFunction }) {
    return (
        <>
            <div className="mt-10 task-group flex justify-center ">
                <div className="parent-group">
                    <div className="group-category flex flex-col gap-5">
                        <p className='text-lg  inline-flex'>{category}</p>
                        <div className="task-group-boxes flex flex-col gap-5 min-w-[900px]">

                            {(taskList === undefined || taskList.length === 0) ? <p className='text-center text-2xl opacity-25'>{`Empty ...`}</p> : taskList.map(v => (<TaskBox category={category} completeTask={completeTask} updateTaskList={updateTaskListFunction} taskData={v} key={v['_id']} ></TaskBox>))}

                            {/* <TaskBox></TaskBox>
            <TaskBox></TaskBox>
            <TaskBox></TaskBox>
            <TaskBox></TaskBox> */}
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

TaskGroup.propTypes = {
    taskList: PropTypes.array,
    category: PropTypes.string.isRequired,
    completeTask: PropTypes.func,
    updateTaskListFunction: PropTypes.func
}

export default TaskGroup
