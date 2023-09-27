import React, { useState, useEffect } from 'react';
import '../src/index.css';
import Navbar from '../src/Components/Navbar';
import TodoForm from '../src/Components/TodoForm.js';
import TodoItem from '../src/Components/TodoItems';

function App() {
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  const addTask = (text) => {
    const newTask = {
      id: taskIdCounter,
      text: text,
      completed: false,
    };

    setUncompletedTasks([newTask, ...uncompletedTasks]);
    setTaskIdCounter(taskIdCounter + 1);
  };

  const completeTask = (taskId) => {
    // Find the task to complete in uncompleted tasks
    const taskToComplete = uncompletedTasks.find((task) => task.id === taskId);

    if (taskToComplete) {
      // Remove the task from uncompleted tasks
      const updatedUncompletedTasks = uncompletedTasks.filter(
        (task) => task.id !== taskId
      );

      // Update the task as completed
      taskToComplete.completed = true;

      // Add the completed task to the bottom of completed tasks
      setCompletedTasks([...completedTasks, taskToComplete]);
      setUncompletedTasks(updatedUncompletedTasks);
    }
  };

  const resetList = () => {
    setCompletedTasks([]);
    setUncompletedTasks([]);
  };

  useEffect(() => {
    // Load task data from localStorage on component mount
    const savedUncompletedTasks = JSON.parse(
      localStorage.getItem('uncompletedTasks')
    );
    const savedCompletedTasks = JSON.parse(
      localStorage.getItem('completedTasks')
    );

    if (savedUncompletedTasks) {
      setUncompletedTasks(savedUncompletedTasks);
    }

    if (savedCompletedTasks) {
      setCompletedTasks(savedCompletedTasks);
    }
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    // Save task data to localStorage whenever tasks change
    localStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [uncompletedTasks, completedTasks]);

  return (
    <div>
      <Navbar resetList={resetList} />
      <TodoForm addTask={addTask} />
      <div className="card_item">
        {uncompletedTasks.map((task) => (
          <TodoItem key={task.id} task={task} completeTask={completeTask} />
        ))}
      </div>

      <div className="card_item">
        {completedTasks.map((task) => (
          <TodoItem key={task.id} task={task} completeTask={completeTask} />
        ))}
      </div>
    </div>
  );
}

export default App;
