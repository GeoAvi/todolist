// TodoForm.js
import React, { useState } from 'react';

function TodoForm({ addTask }) {
  const [task, setTask] = useState('');

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      addTask(task);
      setTask('');
    }
  };

  return (
    <div className="input_div">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default TodoForm;
