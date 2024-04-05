"use client"

import Navbar from "../Navbar/Navbar"
import "../globals.css"
import { useSelector } from "react-redux"

export default function Body({children}) {

    const theme = useSelector((state) => state.theme.value)

    return(
            <body className={theme === "light" ? "lightBody" : "darkBody"}>
                <Navbar/>
                <div className="navRes"></div>
                {children}
            </body>
    )
}