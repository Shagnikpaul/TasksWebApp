import React from "react";

const TodoForm = ({ currentTask, setCurrentTask, handleAddTask }) => {
  return (
    <form onSubmit={handleAddTask}>
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field has-addons has-addons-centered">
            <p className="control">
              <input
                className="input is-primary"
                type="text"
                placeholder="task description"
                value={currentTask ? currentTask.description : ""}
                onChange={event =>
                  setCurrentTask({
                    description: event.target.value,
                    complete: false
                  })
                }
              />
            </p>
            <p className="control">
              <input
                className="button is-info"
                type="submit"
                value="Add Task"
              />
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
