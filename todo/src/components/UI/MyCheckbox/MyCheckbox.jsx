import React, { useState } from 'react';
import classes from './MyCheckbox.module.css';
import checkbox from './wotick.png';
import tick from './wtick.png';

const MyCheckbox = ({ checked, getValue, children }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const checkboxImage = isChecked ? tick : checkbox;

  return (
    <label className={classes.labelCheckbox}>
      <input
        onChange={(event) => {
          setIsChecked(event.target.checked);
          getValue(event.target.checked);
        }}
        type="checkbox"
        className={classes.formCheckbox}
      />
      <span>{children}</span>
      <img src={checkboxImage} alt="checkbox" className={classes.customCheckbox} />
    </label>
  );
};

export default MyCheckbox;
