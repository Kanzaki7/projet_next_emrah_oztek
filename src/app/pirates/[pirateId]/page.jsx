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


export default function Pirate({ params }) {


    const { pirateId } = params;

    const connexion = useSelector((state) => state.auth.connexion)
    const theme = useSelector((state) => state.theme.value)

    const dispatch = useDispatch()

    const [perso, setPerso] = useState([])
    const [dataState, setDataState] = useState(false)

    const [nbrJours, setNbrJours] = useState(1)


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
    }

    return(
        <div className="pirates">
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
                    <div className="divPersoDesc">
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
                            <div className={theme === "light" ? "bountyDescLight" : "bountyDescDark"}><span className="gras">Bounty:</span>  {perso.bounty} <img className="berry" src={"/assets/img/berry.jpg"} alt="" /></div>
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
                <div className='divFootImg'><img src={"/assets/img/treasure.jpg"} alt="" /></div>
            </div>
            <div className='footDiv'>
                <div className='footertitle'>Syndicat des Pirates</div>
                <div>Village de Fuchsia</div>
                <div>L'Île de Dawn</div>
                <div>East Blue</div>
            </div>
        </div>  
    </div>
    )
}