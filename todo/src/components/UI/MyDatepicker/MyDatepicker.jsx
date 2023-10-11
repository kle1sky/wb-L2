import React, { useRef, useEffect } from 'react';
import classes from './MyDatepicker.module.css'

const DatePicker = (props) => {
    const inputRef = useRef(null);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        inputRef.current.min = today;
    }, []);

    return (
        <div>
            <span>Введите deadline: </span>
            <input
                {...props}
                type="date"
                ref={inputRef}
                className={classes.datePicker}
            />
        </div>
    );
};

export default DatePicker;