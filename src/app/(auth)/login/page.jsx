"use client"

import './login.css'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { trueUser, falseUser, deleteUser } from '@/lib/features/AuthSlice'

export default function Login() {

    const user = useSelector((state) => state.auth.value)
    const connexion = useSelector((state) => state.auth.connexion)
    console.log(user);
    const dispatch = useDispatch()

    const [nomConnect, setNomConnect] = useState("")
    const [passConnect, setPassConnect] = useState("")
    const [connexionState, setConnexionState] = useState("")

    const route = useRouter()

    let sub = () => {
        route.push("/register")
    }

    let captureInput = (e) => {
        if (e.target.type === "text") {
            setNomConnect(e.target.value)
            console.log(nomConnect);
        } else if (e.target.type === "password") {
            setPassConnect(e.target.value)
            console.log(passConnect);
        }
    }
    

    let connectUser = () => {
        if (user.length === 0) {
            setConnexionState("non-exist")
        } else {
            if (nomConnect !== user[0].name || passConnect !== user[0].password) {
                // setConnexionState()
                setConnexionState("false")
                dispatch(falseUser())
            } else {
                dispatch(trueUser())
            }
        }
    }

    let disconnect = () => {
        dispatch(falseUser())
    }

    return(
        <div className='login'>
        {
            connexion === false &&
            <div className='formLogin'>
            {connexionState === "non-exist" && <div>Le nom d'utilisateur n'existe pas !</div> }
            {connexionState === "false" && <div>Le nom d'utilisateur ou le mot de passe ne correspondent pas !</div> }
                <div>CONNEXION :</div>
                <div className='formLogin'>
                    <div>
                        <div>Nom d'utilisateur:</div>
                        <input type="text" value={nomConnect} onChange={(e)=>captureInput(e)}/>
                    </div>
                    <div>
                        <div>Password:</div>
                        <input type="password" value={passConnect} onChange={(e)=>captureInput(e)}/>
                    </div>
                    <div className={(nomConnect != "" && passConnect != "") ? "connecteToiTrue" : "connecteToi"} onClick={()=>dispatch(connectUser())}>Connecte-toi!</div>
                    <div className='lien' onClick={()=>sub()}>Pas encore membre ? Inscris-toi !</div>
                </div>
            </div>
        }
        {
            connexion === true &&
            <div className='formLogin'>
                <div>Bienvenue, {user[0].name} !</div>
                <div className='lien' onClick={()=>dispatch(disconnect())}>Se déconnecter !</div>
            </div>
        }
        </div>
    )
}