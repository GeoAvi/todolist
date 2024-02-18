import React, { useState, useEffect } from 'react';
import '../src/index.css';
import Navbar from '../src/Components/Navbar';
import TodoForm from '../src/Components/TodoForm.js';
import TodoItem from '../src/Components/TodoItems';

function App() {
  // two const created as uncompleted and completed task to take care of the sequence in which the task appear in completed and uncompleted list
  const [uncompletedTasks, setUncompletedTasks] = useState(() => {
    const savedUncompletedTasks =
      JSON.parse(localStorage.getItem('uncompletedTasks')) || [];
    return savedUncompletedTasks;
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks =
      JSON.parse(localStorage.getItem('completedTasks')) || [];
    return savedCompletedTasks;
  });

  const [taskIdCounter, setTaskIdCounter] = useState(1);

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
    console.log('localStorage updated');
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    // Save task data to localStorage whenever tasks change
    localStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    console.log('localStorage on updated');
  }, [uncompletedTasks, completedTasks]);

  //   function to handle adding of new task
  const addTask = (text) => {
    const newTask = {
      id: taskIdCounter,
      text: text,
      completed: false,
    };
    // sequencing the task with newly added task first followed by previous uncompleted task
    setUncompletedTasks([newTask, ...uncompletedTasks]);
    setTaskIdCounter(taskIdCounter + 1);
  };

  //function to identify completed tasks
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

  //function to reset the list to blank on clicking of reset button
  const resetList = () => {
    setCompletedTasks([]);
    setUncompletedTasks([]);
  };

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
