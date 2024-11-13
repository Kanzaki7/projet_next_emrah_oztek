"use client"

import Navbar from "../Navbar/Navbar"
import ModalBurger from "../modalBurger/modalBurger"
import "../globals.css"
import "./body.css"
import { useSelector } from "react-redux"

export default function Body({children}) {

    const theme = useSelector((state) => state.theme.value)
    const burger = useSelector((state) => state.burger.value)

    return(
            <body className={theme === "light" && burger === false ? "lightBody" : theme === "dark" && burger === false ? "darkBody" : theme === "light" && burger === true ? "lightBodyOverflow" : "darkBodyOverflow"}>
                <Navbar/>
                {/* <div className="navRes"></div> */}
                {children}
            </body>
    )
}