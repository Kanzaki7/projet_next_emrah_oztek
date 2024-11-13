"use client"

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import imgPerso from '../../imgPerso.json'
import Loading from "@/app/loading";
// import styles from "../pirates.module.css"
import "../pirates.css"
import "./pirate.css"
import Image from "next/image";
import { addCart } from "@/lib/features/MissionsSlice";
import { addTotal } from "@/lib/features/TotalSlice";
import { addFavorite, deleteFavorite } from "@/lib/features/FavoriteSlice";
import { burgerActive } from '@/lib/features/BurgerSlice'
import Link from "next/link";



export default function Pirate({ params }) {


    const { pirateId } = params;

    const [theClass, setTheClass] = useState("home")

    const connexion = useSelector((state) => state.auth.connexion)
    const theme = useSelector((state) => state.theme.value)
    const burger = useSelector((state) => state.burger.value)
    const tableau = useSelector((state) => state.missions.value)
    const favoris = useSelector((state) => state.favorite.value)
    const user = useSelector((state) => state.auth.value)

    const dispatch = useDispatch()

    const [perso, setPerso] = useState([])
    const [dataState, setDataState] = useState(false)

    const [nbrJours, setNbrJours] = useState(1)
    const [modal, setModal] = useState(false)
    const [modalFavori, setModalFavori] = useState(false)


    useEffect(() => {
        fetch(`https://api.api-onepiece.com/v2/characters/fr/${pirateId}`)
            .then((response) => response.json())
            .then((response) => setPerso(response))
            // .then((response) => console.log(response))
            
            .catch((error) => console.log(error));
            
            // console.log(response);
        setTimeout(() => {
            if (perso) {
                setDataState(true)
            } else {
                setDataState(false)
            }
        }, 1000);
    }, [])

    useEffect(() => {
      console.log(perso);
    }, [perso])

    let addPirate = ({name, bounty, bountyString, quantity, total}) => {
        dispatch(addCart({name, bounty, bountyString, quantity, total}))
        dispatch(addTotal(total))
        setTimeout(() => {
            setModal(true)
        }, 1000);
    }

    let subNbrJours = () => {
        if (nbrJours > 1) {
            setNbrJours(nbrJours-1)
        } else {
            setNbrJours(nbrJours)
        }
    }



    let changeFav = ({id, name, bounty, favorite}) => {
        dispatch(addFavorite({id, name, bounty, favorite}))
        setTimeout(() => {
            setModalFavori(true)
        }, 1000);
    }

    return(
        <div className="piratesID">
            {modal === true && 
                <div className="modalPseudo">
            <div className="modal-contentPseudo">
                <div className="texteModalPseudo">
                    Une bouteille à la mer a été envoyé à <span className="recrue">{perso.name}</span> !
                </div>
                <div className="bottleModal">
                    <Image src="/assets/img/modalBottle.png" alt="" width={100} height={100}/>
                </div>
                <div type="btn" className="btnModalPseudo" id="no" onClick={()=>setModal(false)}>
                    Fermer
                </div>
            </div>
        </div>
            }
            {modalFavori === true && 
                <div className="modalPseudo">
            <div className="modal-contentPseudo">
                <div className="texteModalPseudo">
                    <span className="recrue">{perso.name}</span> a été ajouté(e) dans les favoris !
                </div>
                <div className="bottleModal">
                    <svg className={perso.favorite === true ? "starOn" : "star"} viewBox='0 0 100 100' onClick={()=>dispatch(changeFav({id: perso.id, name: perso.name, bounty: perso.bounty, favorite: true}))}>
                                                <g className="starOn">
                                                    <path d="M 50 4 61.23 38.55 97.55 38.55 68.16 59.9 79.39 94.45 50 73.1 20.6 94.45 31.84 59.9 2.45 38.55 38.77 38.55 z" />
                                                    <path class="starEX" d="M 50 4 61.23 38.55 97.55 38.55 68.16 59.9 79.39 94.45 50 73.1 20.6 94.45 31.84 59.9 2.45 38.55 38.77 38.55 z" />
                                                </g>
                    </svg>
                </div>
                <div type="btn" className="btnModalPseudo" id="no" onClick={()=>setModalFavori(false)}>
                    Fermer
                </div>
            </div>
        </div>
            }
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
                                        <Link href="/comissions" className='pagesMission'><div className={theClass === "mission" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("mission")}><Image id='bottleBurger' src="/assets/img/bottle2.jpg" alt="" width={50} height={50}/> Commissions({tableau.length})</div></Link>
                                    </div>
                                }
                                {connexion === true && <Link href="/login" className='pagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("connexion")}>Connected as {user[0].name}</div></Link> }
                                {connexion === false && <Link href="/login" className='pagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("connexion")}>Connexion/Inscription</div></Link>}
                            </div>
                </div>
            {/* <p>{perso.name}</p> */}
            {dataState === true ? (
                <div className="pirate">
                    <div className="divWanted">
                        <div className="wantedPirate">
                            {
                                imgPerso.map((imgP, index) => (
                                perso.id === imgP.id ?                         
                                    <div className="imgPersoPirate" key={index}>
                                        <Image fill={true} src={imgP.img} alt=""/>
                                    </div>
                                :null 
                                ))
                            }
                            <div className="nameWantedPirate">
                                <div>{perso.name.toUpperCase()}</div>
                            </div>
                            <div className="bountyWantedPirate">{perso.bounty}</div>
                        </div>
                    </div>
                    <div className={theme === "light" ? "divPersoDescLight" : "divPersoDescDark"}>
                        <div className="desc">
                            <div className="nameStar">
                                <div className={theme === "light" ? "nameDescLight" : "nameDescDark"}>{perso.name.toUpperCase()}</div>
                                {connexion === true &&
                                    <div className="starDiv">
                                        <svg className={perso.favorite === true ? "starOn" : "star"} viewBox='0 0 100 100' onClick={()=>dispatch(changeFav({id: perso.id, name: perso.name, bounty: perso.bounty, favorite: true}))}>
                                            <g className="star">
                                                <path d="M 50 4 61.23 38.55 97.55 38.55 68.16 59.9 79.39 94.45 50 73.1 20.6 94.45 31.84 59.9 2.45 38.55 38.77 38.55 z" />
                                                <path class="starEX" d="M 50 4 61.23 38.55 97.55 38.55 68.16 59.9 79.39 94.45 50 73.1 20.6 94.45 31.84 59.9 2.45 38.55 38.77 38.55 z" />
                                            </g>
                                        </svg>
                                    </div>
                                }
                            </div>
                            <div className={theme === "light" ? "bountyDescLight" : "bountyDescDark"}><span className="gras">Bounty:</span>  {perso.bounty} <Image className="berry" src={"/assets/img/berry.jpg"} alt="" width={70} height={70}/></div>
                            <div className={theme === "light" ? "crewLight" : "crewDark"}><span className="gras">Equipage:</span>  {perso.crew.name}</div>
                            {
                                perso.fruit && <div className={theme === "light" ? "demonLight" : "demonDark"}><span className="gras">Fruit du démon:</span>  {perso.fruit.name}</div>
                            }
                            <div className={theme === "light" ? "jobLight" : "jobDark"}><span className="gras">Job:</span>  {perso.job}</div>
                        </div>
                        <div className="recrute">
                            <div className="nbrJours">
                                <div className={theme === "light" ? "textJoursLight" : "textJoursDark"}>Nombre de jours :</div>
                                <div className="scroll">
                                    <div className="moinsUn" onClick={()=>subNbrJours()}>-1</div>
                                    <div className="counter">{nbrJours}</div>
                                    <div className="plusUn" onClick={()=>setNbrJours(nbrJours+1)}>+1</div>
                                </div>
                            </div>
                            {
                                connexion === true && 
                                <div className="parchment">
                                    <div className="recrutez" onClick={()=>dispatch(addPirate({                             
                                        name: perso.name.toUpperCase(), 
                                        bounty: parseFloat(perso.bounty), 
                                        bountyString: perso.bounty, 
                                        quantity: nbrJours, 
                                        total: parseFloat(perso.bounty)*nbrJours}))}>Recrutez !
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                ) : <Loading />
            }
            <div className="footerHome">
                <div className='footDiv'>
                    <div className='footertitle'>Informations</div>
                    <div className='footerLink'>Hall of Fame</div>
                    <div className='footerLink'>Nouvelles primes</div>
                </div>
                <div className='footDiv'>
                    <div className='footertitle'>My Account</div>
                    <div className='footerLink'>My missions</div>
                    <div className='footerLink'>Contact us</div>
                </div>
                <div className='footDiv' id="follow">
                    <div className='footertitle'>Follow us</div>
                    <div className='divFootImg'><Image src={"/assets/img/treasure.jpg"} alt="" width={175} height={130}/></div>
                </div>
                <div className='footDiv' id="follow2">
                    <div className='footertitle'>Syndicat des Pirates</div>
                    <div className='footerLink'>Village de Fuchsia</div>
                    <div className='footerLink'>L&apos;Île de Dawn</div>
                    <div className='footerLink'>East Blue</div>
                </div>
            </div>  
    </div>
    )
}