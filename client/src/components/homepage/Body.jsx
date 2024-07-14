import React from 'react'
import ReactDOM from "react-dom";
import TaskList from './Task-list';
import TodoForm from './todo-form';


const Body = () => {
    const [taks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const handleAddTask = e => {
        setTasks(taks => [...TaskList, currentTask]);
        setCurrentTask(null);
        e.preventDefault();
    }

    const handleRemoveTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const handleCompleteTask = index => {
        const newTasks = [...tasks];
        newTasks[index].complete = !newTasks[index].complete;
        setTasks(newTasks);
    };
    return (
        <div className="App content">
            <h1 className="title">To Do List</h1>
            <TodoForm
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                handleAddTask={handleAddTask}
            />
            <TaskList
                tasks={tasks}
                setTasks={setTasks}
                handleRemoveTask={handleRemoveTask}
                handleCompleteTask={handleCompleteTask}
            />
        </div>
    )
}

export default Body
