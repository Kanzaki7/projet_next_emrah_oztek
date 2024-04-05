"use client"

import './favoris.css'
import { useSelector, useDispatch } from 'react-redux'
import imgPerso from '../imgPerso.json'
import { useState, useEffect } from 'react'
import Loading from '../loading'



export default function Favoris() {

    const favorite = useSelector((state) => state.favorite.value)
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
        }, 1000);
    }, [])

    return(
        <div className='favorite'>
            <div className='favoriteMapping'>
            {dataState === true ?
                favorite.filter(l => l.favorite === true).map((pers, index) => (
                        <div className='wantedWrapper'>
                            <div key={index} className="wanted">
                                {
                                    imgPerso.map((imgP, index) => (
                                    pers.id === imgP.id ? <img key={index} className="imgPerso" src={imgP.img} alt=""/>:null 
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