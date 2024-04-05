"use client"

import { useSelector } from 'react-redux'
import './globals.css'

export default function Error() {

    const theme = useSelector((state) => state.theme.value)

    return(
        <div className='errorDiv'>
            <h1 className={theme === "light" ? 'messageLight' : "messageDark"}>Error 404</h1>
            <div className='error'></div>
        </div>
    )
}