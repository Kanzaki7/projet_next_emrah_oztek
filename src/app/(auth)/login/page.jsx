"use client"

import './login.css'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { trueUser, falseUser, deleteUser } from '@/lib/features/AuthSlice'
import { burgerActive } from '@/lib/features/BurgerSlice'
import Link from 'next/link'
import Image from 'next/image'

export default function Login() {

    const [theClass, setTheClass] = useState("home")
    const tableau = useSelector((state) => state.missions.value)
    const favoris = useSelector((state) => state.favorite.value)

    const theme = useSelector((state) => state.theme.value)
    const burger = useSelector((state) => state.burger.value)

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
            <div className={burger === false ? "navRes" : "navResActive"}>
                <div className='burgerMenuDiv'>    
                    <div className='burgerMenuBones' onClick={()=>dispatch(burgerActive())}></div>
                </div>
                <div className='navPagesBurger'>
                    <Link href="/" className='pagesHome'><div className={theClass === "home" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("home")}><Image src="/assets/img/sunny2.jpg" alt="" width={50} height={50}/>Home</div></Link>
                    <Link href="/pirates" className='pagesPirate'><div className={theClass === "pirate" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("pirate")}><Image src="/assets/img/skullIcon.png" alt="" width={50} height={50}/> Pirates</div></Link>
                    {connexion === true &&
                        <div className='hiddenLinksBurger'>
                            <Link href="/favoris" className='pagesFavoris'><div className={theClass === "favoris" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("favoris")}><Image src="/assets/img/etoile.png" alt="" width={50} height={50}/> Favoris({favoris.length})</div></Link>
                            <Link href="/comissions" className='pagesMission'><div className={theClass === "mission" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("mission")}><Image id='bottleBurger' src="/assets/img/bottle2.jpg" alt="" width={50} height={50} /> Commissions({tableau.length})</div></Link>
                        </div>
                    }
                    {connexion === true && <Link href="/login" className='pagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("connexion")}>Connected as {user[0].name}</div></Link> }
                    {connexion === false && <Link href="/login" className='pagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("connexion")}>Connexion/Inscription</div></Link>}
                </div>
            </div>
        {
            connexion === false &&
            <div className='formLogin'>
            {connexionState === "non-exist" && <div>Le nom d&apos;utilisateur n&apos;existe pas !</div> }
            {connexionState === "false" && <div>Le nom d&apos;utilisateur ou le mot de passe ne correspondent pas !</div> }
                <div>CONNEXION :</div>
                <div className='formLogin'>
                    <div>
                        <div>Nom d&apos;utilisateur:</div>
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