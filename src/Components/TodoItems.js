// TodoItem.js
import React from 'react';

function TodoItem({ task, completeTask }) {
  return (
    <div className="item_card">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => completeTask(task.id)}
      />
      <span>{task.text}</span>
    </div>
  );
}

export default TodoItem;
