import { useState } from 'react';
import EditForm from '../EditForm/EditForm';
import trash from './trash.png'
import classes from './Item.module.css';
import MyCheckbox from '../UI/MyCheckbox/MyCheckbox';

const Item = ({ item, checkTask, editTask, deleteTask }) => {
  const [editable, setEditable] = useState(false);
  return (
    <div className={classes.listItem}>
      <MyCheckbox checked={item.isChecked} getValue={(value) => checkTask(item, value)}>
        {item.title}
      </MyCheckbox>
      <span className={classes.itemDescription}>{item.description}</span>
      <span className={classes.itemStart}>{new Date(item.start).toLocaleDateString()}</span>
      <span className={classes.itemDeadline}>{new Date(item.deadline).toLocaleDateString()}</span>
      <div className={classes.btns}>
        <i className={classes.editBtn} onClick={() => setEditable((state) => !state)}>EDIT</i>
        <img className={classes.trash} onClick={() => deleteTask(item)} src={trash} alt="trashbin" />
      </div>
      {editable && <EditForm close={() => setEditable(false)} editTask={editTask} task={item} />}
    </div>
  );
};

export default Item;
