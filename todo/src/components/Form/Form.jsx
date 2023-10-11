import React, { useState } from 'react';
import classes from './Form.module.css';
import MyInput from '../UI/MyInput/MyInput';
import MyCheckbox from '../UI/MyCheckbox/MyCheckbox';
import MyBtn from '../UI/MyBtn/MyBtn';
import DatePicker from '../UI/MyDatepicker/MyDatepicker';

const Form = ({ setTask }) => {
  const [isDescr, setIsDescr] = useState(false);
  const [post, setPost] = useState({
    id: Date.now(),
    title: '',
    description: '',
    deadline: '',
    start: '',
    isChecked: false,
  });

  const createTask = (e) => {
    e.preventDefault();

    if (!post.title || !post.deadline) {
      return;
    }
    setTask({ ...post, start: new Date().toISOString().split('T')[0] });

    setPost({
      id: Date.now(),
      title: '',
      description: '',
      deadline: '',
      start: '',
      isChecked: false,
    })
  };

  return (
    <form onSubmit={createTask} className={classes.form}>
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
  );
};

export default Form;
