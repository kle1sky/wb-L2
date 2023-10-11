import React from 'react';
import classes from './List.module.css';
import Item from '../Item/Item';

const List = ({ tasks, checkTask, editTask, deleteTask }) => {
  return (
    <div className={classes.list}>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Item key={index} deleteTask={deleteTask} editTask={editTask} checkTask={checkTask} item={task} />
        ))
      ) : (
        <span className={classes.screen}>Задач нет!</span>
      )}
    </div>
  );
};

export default List;
