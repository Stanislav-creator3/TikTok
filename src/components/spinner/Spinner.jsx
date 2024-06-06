import React from 'react'
import style from "./spinner.module.scss"
import { CircularProgress } from '@mui/material'

const Spinner = () => {
  return (
    <div className={style.spinner}>
        <CircularProgress size={60}/>
    </div>
  )
}

export default Spinner