import React, { useState } from 'react';
import classes from './EditForm.module.css';
import MyInput from '../UI/MyInput/MyInput';
import MyCheckbox from '../UI/MyCheckbox/MyCheckbox';
import MyBtn from '../UI/MyBtn/MyBtn';
import DatePicker from '../UI/MyDatepicker/MyDatepicker';

const EditForm = ({ editTask, task, close }) => {
  const [isDescr, setIsDescr] = useState(false);
  const [post, setPost] = useState(task);

  const createTask = (e) => {
    e.preventDefault();

    if (!post.title || !post.deadline) return;

    editTask(task, post);
    close();
  };

  return (
    <div onClick={() => close()} className={classes.wrapper}>
      <form onSubmit={createTask} onClick={(e) => e.stopPropagation()} className={classes.form}>
        <MyInput
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder={'Что нужно сделать?'}
        />
        <MyCheckbox
          getValue={(value) => setIsDescr(value)}
          onChange={() => setIsDescr((state) => !state)}>
          Добавить описание
        </MyCheckbox>
        {isDescr && (
          <MyInput
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder={'Введите описание'}
          />
        )}

        <DatePicker
          value={post.deadline}
          onChange={(e) => setPost({ ...post, deadline: e.target.value })}
        />
        <MyBtn />
      </form>
    </div>
  );
};

export default EditForm;
