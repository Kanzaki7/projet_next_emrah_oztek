"use client"

import { useState, useEffect } from "react";
import imgPerso from '../imgPerso.json'
import Loading from "../loading";
// import styles from './pirates.module.css'
import "./pirates.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addFavorite, deleteFavorite } from "@/lib/features/FavoriteSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Pirates() {

    const route = useRouter()

    const connexion = useSelector((state) => state.auth.connexion)

    const dispatch = useDispatch()

    const [perso, setPerso] = useState([])
    const [addObject, setAddObject] = useState([])
    const [filtPerso, setFiltPerso] = useState([])
    const [dataState, setDataState] = useState(false)
    const [tearOff, setTearOff] = useState(false)
    const [search, setSearch] = useState("")
    const [job, setJob] = useState("")
    const [crew, setCrew] = useState("")
    const [status, setStatus] = useState(-1)

    useEffect(() => {
        fetch(`https://api.api-onepiece.com/v2/characters/fr`)
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

    useEffect(() => {
      console.log(perso);
      let newArray = perso.map(obj => ({ ...obj, isChecked: 'false' }))
      setAddObject(newArray)
      let filt = newArray.filter(l => parseInt(l.bounty) > 0)
        .filter(l => l.name.toLowerCase().includes(search.toLowerCase()) 
        || l.job?.toLowerCase().includes(search.toLowerCase()) 
        || l.crew?.name.toLowerCase().includes(search.toLowerCase()))
        .filter((l) => {
          switch (job) {
              case "Capitaine":
                  return l.job === "Capitaine";
              case "Bras-Droit":
                  return l.job === "Bras-Droit";
              case "Navigatrice":
                  return l.job === "Navigatrice";
              case "Tireur d’élite":
                  return l.job === "Tireur d’élite";
              case "Cuisinier":
                  return l.job === "Cuisinier";
              case "Médecin":
                  return l.job === "Médecin";
              case "Archéologue":
                  return l.job === "Archéologue";
              case "Charpentier":
                  return l.job === "Charpentier";
              case "Musicien":
                  return l.job === "Musicien";
              case "Timonier":
                  return l.job === "Timonier";
              default:
                  return "all";
          }
      })
        .filter((l) => {
          switch (crew) {
              case "L’équipage du Chapeau de Paille":
                  return l.crew?.name === "L’équipage du Chapeau de Paille";
              case "Baggy's Delivery":
                  return l.crew?.name === "Baggy's Delivery";
              case "L’armada Pirate de Don Krieg":
                  return l.crew?.name === "L’armada Pirate de Don Krieg";
              case "L’équipage du Roux":
                  return l.crew?.name === "L’équipage du Roux";
              case "L’équipage de Big Mom":
                  return l.crew?.name === "L’équipage de Big Mom";
              case "L’équipage aux Cent Bêtes":
                  return l.crew?.name === "L’équipage aux Cent Bêtes";
              case "L’équipage de Barbe Noire":
                  return l.crew?.name === "L’équipage de Barbe Noire";
              case "L’équipage des Pirates Roger":
                  return l.crew?.name === "L’équipage des Pirates Roger";
              case "L’équipage de Barbe Blanche":
                  return l.crew?.name === "L’équipage de Barbe Blanche";
              case "L’équipage de Don Quichotte":
                  return l.crew?.name === "L’équipage de Don Quichotte";
              default:
                  return "all";
          }
      })
        setFiltPerso(filt)
        console.log(filtPerso);
    }, [perso, search, job, crew])

    const goPirate = (id) => {
        setTearOff(true)
        setTimeout(() => {
            route.push(`/pirates/${id}`)
        }, 1200);
    }

    // let changeStar = (index, {id, name, bounty, favorite}) => {
    //     setStatus(index)
    //     dispatch(addFavorite({id, name, bounty, favorite}))
    // }

    return(
        <div className="pirates">
            <div className='searchBar'>
                <input type="text" className='search' placeholder="Nom ou profession..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <div className='filter'>
                    <select name="pirate" id="job" onChange={(e)=>setJob(e.target.value)}>
                        <option value="">Profession</option>
                        <option value="Capitaine">Capitaine</option>
                        <option value="Bras-Droit">Bras-Droit</option>
                        <option value="Navigatrice">Navigatrice</option>
                        <option value="Tireur d’élite">Tireur d’élite</option>
                        <option value="Cuisinier">Cuisinier</option>
                        <option value="Archéologue">Archéologue</option>
                        <option value="Charpentier">Charpentier</option>
                        <option value="Musicien">Musicien</option>
                        <option value="Timonier">Timonier</option>
                    </select>
                    <select name="pirate" id="crew" onChange={(e)=>setCrew(e.target.value)}>
                        <option value="">Equipage</option>
                        <option value="L’équipage du Chapeau de Paille">L’équipage du Chapeau de Paille</option>
                        <option value="Baggy's Delivery">Baggy's Delivery</option>
                        <option value="L’armada Pirate de Don Krieg">L’armada Pirate de Don Krieg</option>
                        <option value="L’équipage du Roux">L’équipage du Roux</option>
                        <option value="L’équipage de Big Mom">L’équipage de Big Mom</option>
                        <option value="L’équipage aux Cent Bêtes">L’équipage aux Cent Bêtes</option>
                        <option value="L’équipage de Barbe Noire">L’équipage de Barbe Noire</option>
                        <option value="L’équipage des Pirates Roger">L’équipage des Pirates Roger</option>
                        <option value="L’équipage de Barbe Blanche">L’équipage de Barbe Blanche</option>
                        <option value="L’équipage de Don Quichotte">L’équipage de Don Quichotte</option>
                    </select>
                </div>
            </div>
            <div className="mapping">
                {dataState === true ? (
                filtPerso.map((pers, index) => (
                    <div className="wantedWrapper">
                    {/* {connexion === true && 
                        <div className="starDivCard">
                            <svg className={status === index ? "starOnCard" : "starCard"} viewBox='0 0 100 100' onClick={()=>dispatch(changeStar(index, {id: perso.id, name: perso.name, bounty: perso.bounty, favorite: true}))}>
                                <g className="star">
                                    <path d="M 50 4 61.23 38.55 97.55 38.55 68.16 59.9 79.39 94.45 50 73.1 20.6 94.45 31.84 59.9 2.45 38.55 38.77 38.55 z" />
                                    <path class="starEXCard" d="M 50 4 61.23 38.55 97.55 38.55 68.16 59.9 79.39 94.45 50 73.1 20.6 94.45 31.84 59.9 2.45 38.55 38.77 38.55 z" />
                                </g>
                            </svg>
                        </div>
                    } */}
                        <div key={index} className={tearOff ? "tearOff" : "wanted"} onClick={()=>goPirate(pers.id)}>
                            {
                                imgPerso.map((imgP, index) => (
                                pers.id === imgP.id ? <img key={index} className="imgPerso" src={imgP.img} alt=""/>:null 
                                ))
                            }
                            <div className="nameWanted">
                                <div>{pers.name.toUpperCase()}</div>
                            </div>
                            <div className="bountyWanted">{pers.bounty}</div>
                        </div>
                    </div>
                ))
                ) : <Loading />
                }
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