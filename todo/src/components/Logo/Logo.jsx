import React from 'react'
import classes from './Logo.module.css'
import image from './to-do-list.png'

const Logo = () => {
    return (
        <div className={classes.logo}>
            <img src={image} alt="" className={classes.logo__image} />
        </div>
    )
}

export default Logo;