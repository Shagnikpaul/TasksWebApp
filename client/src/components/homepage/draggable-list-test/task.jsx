import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Task = ({ task, index, handleRemoveTask, handleCompleteTask }) => {
  return (
    <>
      <span className="icon has-text-info">
        <FontAwesomeIcon
          icon="window-close"
          onClick={() => handleRemoveTask(index)}
          style={{ cursor: "pointer" }}
        />
      </span>
      <span className="icon has-text-info">
        <FontAwesomeIcon
          icon={task.complete ? "redo-alt" : "check"}
          onClick={() => handleCompleteTask(index)}
          style={{ cursor: "pointer", color: task.complete ? "#f00" : "" }}
        />
      </span>
      <span
        style={{
          textDecoration: task.complete ? "line-through" : "none",
          paddingLeft: "8px",
          textTransform: "uppercase"
        }}
      >
        {task.description}
      </span>
      <span className="icon has-text-info bars-right">
        <FontAwesomeIcon icon="bars" style={{ color: "#ddd" }} />
      </span>
    </>
  );
};

export default Task;
