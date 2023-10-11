import React, { useState } from 'react';
import Form from './components/Form/Form';
import Logo from './components/Logo/Logo';
import List from './components/List/List.jsx';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const checkTask = (task, isChecked) => {
    const cloneTasks = [...tasks];
    const index = cloneTasks.indexOf(task);
    cloneTasks[index].isChecked = isChecked;
    setTasks(cloneTasks);
  };

  const editTask = (task, newPost) => {
    const cloneTasks = [...tasks];
    const index = tasks.indexOf(task);

    if (index !== -1) {
      cloneTasks[index] = newPost;
      setTasks(cloneTasks);
    }
  };

  const deleteTask = (task) => {
    const cloneTasks = [...tasks];
    const index = cloneTasks.indexOf(task);
    cloneTasks.splice(index, 1);
    setTasks(cloneTasks);
  }

  return (
    <div className="App">
      <Logo />
      <Form setTask={addTask} />
      <List deleteTask={deleteTask} editTask={editTask} checkTask={checkTask} tasks={tasks} />
    </div>
  );
}

export default App;
