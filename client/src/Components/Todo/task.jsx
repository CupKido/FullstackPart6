import { useState } from 'react'
import '../../styles/Todos.css'
function Task({ title, completed, taskId, onCompletedChange, onDelete }) {

  return (
    <div className="task-container">
      <input className="task-checkbox" type="checkbox" checked={completed} onChange={() => onCompletedChange(taskId)} />
      <p className={`task-title ${completed ? 'task-completed' : 'task-not-completed'}`}>{title}</p>
      <button className="task-delete-btn" onClick={() => onDelete(taskId)}>X</button>
    </div>
  );
}

export default Task