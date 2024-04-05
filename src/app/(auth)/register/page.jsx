"use client"

import './register.css'
import { useRouter } from 'next/navigation'
import { addUser } from '@/lib/features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

export default function Register() {

    const user = useSelector((state) => state.auth.value)
    console.log(user);

    const dispatch = useDispatch()

    const [inputNom, setInputNom] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [account, setAccount] = useState("")

    const route = useRouter()

    let sub = () => {
        route.push("/login")
    }

    let captureInput = (e) => {
        if (e.target.type === "text") {
            setInputNom(e.target.value)
        } else if (e.target.type === "password") {
            setInputPassword(e.target.value)
        }
        // dispatch(addUser({name, password}))
    }

    let noInput = ({name, password}) => {
        if (inputNom === "" || inputPassword === "") {
            setAccount("false")
        } else {
            dispatch(addUser({name, password}))
            setAccount("true")
            setInputNom("")
            setInputPassword("")
        }
    }

    return(
        <div className='register'>
            {account === "false" && <div>Veuillez entrer un nom d'utilisateur ou mot de passe valable !</div> }
            {account === "true" && 
            <div className='formRegister'>
                <div>Bienvenue parmi nous, {user[0].name} !</div> 
                <div className='lien' onClick={()=>sub()}>Va vers la page de connexion !</div>
            </div>
            }
            {(account === "" || account ===  "false") &&
            <div className='formRegister'>
                <div>INSCRIPTION :</div>
                <div className='formRegister'>
                    <div>
                        <div>Nom d'utilisateur:</div>
                        <input type="text" value={inputNom} onChange={(e)=>captureInput(e)}/>
                    </div>
                    <div>
                        <div>Password:</div>
                        <input type="password" value={inputPassword} onChange={(e)=>captureInput(e)}/>
                    </div>
                    <div className={(inputNom !== "" && inputPassword !== "") ? 'inscrireTrue' : "inscrire"} onClick={()=>dispatch(noInput({name: inputNom, password: inputPassword}))}>Inscris-toi!</div>
                    <div className='lien' onClick={()=>sub()}>Déjà membre ? Connecte-toi !</div>
                </div>
            </div>
            }
        </div>
    )
}