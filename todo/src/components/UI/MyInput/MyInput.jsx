import classes from './MyInput.module.css';

const MyInput = ({ placeholder, ...props }) => {
  return <input {...props} placeholder={placeholder} type="text" className={classes.formInput} />;
};

export default MyInput;
