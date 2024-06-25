"use client"

import './favoris.css'
import { useSelector, useDispatch } from 'react-redux'
import imgPerso from '../imgPerso.json'
import { useState, useEffect } from 'react'
import Loading from '../loading'
import Link from 'next/link'
import Image from 'next/image'


export default function Favoris() {

    const tableau = useSelector((state) => state.missions.value)
    const favoris = useSelector((state) => state.favorite.value)
    const connexion = useSelector((state) => state.auth.connexion)
    const user = useSelector((state) => state.auth.value)
    const [theClass, setTheClass] = useState("home")
    const favorite = useSelector((state) => state.favorite.value)
    const burger = useSelector((state) => state.burger.value)
    console.log(favorite);
    const dispatch = useDispatch()

    const [dataState, setDataState] = useState(false)

    const goPirate = (id) => {
        setTearOff(true)
        setTimeout(() => {
            route.push(`/pirates/${id}`)
        }, 1200);
    }

    useEffect(() => {
        setTimeout(() => {
            if (favorite) {
                setDataState(true)
            } else {
                setDataState(false)
            }
        }, 3000);
    }, [])

    return(
        dataState === true ?
        <div className='favorite'>
                                <div className={burger === false ? "navRes" : "navResActive"}>
                        <div className='navPagesBurger'>
                                        <Link href="/" className='pagesHome'><div className={theClass === "home" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("home")}><Image src="/assets/img/sunny2.jpg" alt="" width={50} height={50}/>Home</div></Link>
                                        <Link href="/pirates" className='pagesPirate'><div className={theClass === "pirate" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("pirate")}><Image src="/assets/img/skullIcon.png" alt="" width={50} height={50}/> Pirates</div></Link>
                                        {connexion === true &&
                                            <div className='hiddenLinks'>
                                                <Link href="/favoris" className='pagesFavoris'><div className={theClass === "favoris" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("favoris")}><Image src="/assets/img/etoile.png" alt="" width={50} height={50}/> Favoris({favoris.length})</div></Link>
                                                <Link href="/comissions" className='pagesMission'><div className={theClass === "mission" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("mission")}><Image id='bottleBurger' src="/assets/img/bottle2.jpg" alt="" width={50} height={50}/> Commissions({tableau.length})</div></Link>
                                            </div>
                                        }
                                        {connexion === true && <Link href="/login" className='pagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("connexion")}>Connected as {user[0].name}</div></Link> }
                                        {connexion === false && <Link href="/login" className='pagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("connexion")}>Connexion/Inscription</div></Link>}
                                    </div>
                        </div>
            <div className='favoriteMapping'>
            {dataState === true ?
                favorite.filter(l => l.favorite === true).map((pers, index) => (
                        <div className='wantedWrapper' key={index}>
                            <div key={index} className="wanted">
                                {
                                    imgPerso.map((imgP, index) => (
                                    pers.id === imgP.id ? <Image key={index} className="imgPerso" src={imgP.img} alt="" width={2450} height={180}/>:null 
                                    ))
                                }
                                <div className="nameWanted">
                                    <div onClick={()=>goPirate(pers.id)}>{pers.name.toUpperCase()}</div>
                                </div>
                                <div className="bountyWanted">{pers.bounty}</div>
                            </div>
                        </div>
                )) : <Loading/>
                }
                {/* {
                    favorite.filter(l => l.favorite === true).map((pers, index) => (
                        <div key={index}>{pers.name}</div>
                    ))
                } */}
            </div>
            <div className="footerHome">
            <div className='footDiv'>
                <div className='footertitle'>Informations</div>
                <div>Hall of Fame</div>
                <div>Nouvelles primes</div>
            </div>
            <div className='footDiv'>
                <div className='footertitle'>My Account</div>
                <div>My missions</div>
                <div>Contact us</div>
            </div>
            <div className='footDiv'>
                <div className='footertitle'>Follow us</div>
                <div className='divFootImg'><Image src={"/assets/img/treasure.jpg"} alt="" width={175} height={130}/></div>
            </div>
            <div className='footDiv'>
                <div className='footertitle'>Syndicat des Pirates</div>
                <div>Village de Fuchsia</div>
                <div>L&apos;Île de Dawn</div>
                <div>East Blue</div>
            </div>
        </div>
        </div> : <Loading/>
    )
}