"use client"

import './navbar.css'
import Link from 'next/link'
import oneCrew from '../../../public/assets/img/one-crew.png'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '@/lib/features/themeSlice'
import { useState } from 'react'

export default function Navbar() {

    const tableau = useSelector((state) => state.missions.value)
    const favoris = useSelector((state) => state.favorite.value)
    const connexion = useSelector((state) => state.auth.connexion)
    const user = useSelector((state) => state.auth.value)
    const theme = useSelector((state) => state.theme.value)
    const [theClass, setTheClass] = useState("home")
 

    const dispatch = useDispatch()


    return(
        <div className="navbar">
            <div className='navLogo'>
                <Image src={oneCrew} alt="" />
            </div>
            <div className='navPages'>
                <Link href="/" className='linkPagesHome'><div className={theClass === "home" ? 'scrollPanierActive' : "scrollPanier"} onClick={()=>setTheClass("home")}><img src="/assets/img/sunny2.jpg" alt="" />Home</div></Link>
                <Link href="/pirates" className='linkPagesPirate'><div className={theClass === "pirate" ? 'scrollPanierActive' : "scrollPanier"} onClick={()=>setTheClass("pirate")}><img src="/assets/img/skullIcon.png" alt="" /> Pirates</div></Link>
                {connexion === true &&
                    <div className='hiddenLinks'>
                        <Link href="/favoris" className='linkPagesFavoris'><div className={theClass === "favoris" ? 'scrollPanierActive' : "scrollPanier"} onClick={()=>setTheClass("favoris")}><img src="/assets/img/etoile.png" alt="" /> Favoris({favoris.length})</div></Link>
                        <Link href="/comissions" className='linkPagesMission'><div className={theClass === "mission" ? 'scrollPanierActive' : "scrollPanier"} onClick={()=>setTheClass("mission")}><img src="/assets/img/parchmentIcon.png" alt="" /> Commissions({tableau.length})</div></Link>
                    </div>
                }
                {connexion === true && <Link href="/login" className='linkPagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActive' : "scrollPanier"} onClick={()=>setTheClass("connexion")}>Connected as {user[0].name}</div></Link> }
                {connexion === false && <Link href="/login" className='linkPagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActive' : "scrollPanier"} onClick={()=>setTheClass("connexion")}>Connexion/Inscription</div></Link>}
                <label className='linkPagesSwitch'>
                    <input class="slider" type="checkbox" />
                    <div class="switch" onClick={()=>dispatch(toggleTheme())}>
                        <div class="suns"></div>
                        <div class="moons">
                            <div class="star star-1"></div>
                            <div class="star star-2"></div>
                            <div class="star star-3"></div>
                            <div class="star star-4"></div>
                            <div class="star star-5"></div>
                            <div class="first-moon"></div>
                        </div>
                        <div class="sand"></div>
                        <div class="bb8">
                            <img className='sunny' src="/assets/img/sunny2.jpg" alt="" />
                            <div class="shadow"></div>
                        </div>
                    </div>
                </label>
            </div>
            <div className='burgerMenu'>

            </div>
        </div>
    )
}