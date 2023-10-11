import React from 'react'
import classes from './MyBtn.module.css'

const MyBtn = (props) => {
    return (
        <button {...props} className={classes.btn}>Добавить задачу</button>
    )
}

export default MyBtn;