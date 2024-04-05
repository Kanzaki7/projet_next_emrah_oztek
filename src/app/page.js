"use client"

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Loading from './loading';
import imgPerso from './imgPerso.json'
import { useRouter } from "next/navigation";
import Link from "next/link";
// import ModalBurger from "./modalBurger/modalBurger";

export default function Home() {

  const route = useRouter()

  const connexion = useSelector((state) => state.auth.connexion)
  const [theClass, setTheClass] = useState("home")
  const [trans, setTrans] = useState("caroussel2")
  const [activeSlide, setActiveSlide] = useState(2)

  const theme = useSelector((state) => state.theme.value)
  const burger = useSelector((state) => state.burger.value)
  const tableau = useSelector((state) => state.missions.value)
  const favoris = useSelector((state) => state.favorite.value)
  const dispatch = useDispatch()

    const [perso, setPerso] = useState([])
    const [filtPerso, setFiltPerso] = useState([])
    const [dataState, setDataState] = useState(false)
    const [random1, setRandom1] = useState()
    const [random2, setRandom2] = useState()
    const [random3, setRandom3] = useState()
    const [random4, setRandom4] = useState()
    const [random5, setRandom5] = useState()
    const [tearOff, setTearOff] = useState(false)
    const [display, setDisplay] = useState(false)


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
        }, 3000);
    }, [])

    useEffect(() => {
      console.log(perso);
      setRandom1(Math.floor(Math.random()*filtPerso.length))
      setRandom2(Math.floor(Math.random()*filtPerso.length))
      setRandom3(Math.floor(Math.random()*filtPerso.length))
      setRandom4(Math.floor(Math.random()*filtPerso.length))
      setRandom5(Math.floor(Math.random()*filtPerso.length))
    }, [perso])

    useEffect(() => {
        let filt = perso.filter(l => parseInt(l.bounty) > 0)
        setFiltPerso(filt)
        console.log(filtPerso);
    }, [perso])
    
    const goPirate = (id) => {
        setTearOff(true)
        setTimeout(() => {
          route.push(`/pirates/${id}`)
        }, 1200);
    }

       useEffect(() => {
        setTimeout(() => {
            if (trans === "caroussel0") {
                setTrans("caroussel1")
                setActiveSlide(1)
            } else if (trans === "caroussel1") {
                setTrans("caroussel2")
                setActiveSlide(2)
            } else if (trans === "caroussel2") {
                setTrans("caroussel3")
                setActiveSlide(3)
            } else if (trans === "caroussel3") {
                setTrans("caroussel4")
                setActiveSlide(4)
            } else if (trans === "caroussel4") {
                setTrans("caroussel0")
                setActiveSlide(0)
            }
        }, 3000);
        
    }, [trans])

    // function mouv(e) {
    //     if (e.target.id === "droite") {
    //         if (trans === "caroussel0") {
    //             setTrans("caroussel1")
    //         } else if (trans === "caroussel1") {
    //             setTrans("caroussel2")
    //         } else if (trans === "caroussel2") {
    //             setTrans("caroussel3")
    //         } else if (trans === "caroussel3") {
    //             setTrans("caroussel4")
    //         } else if (trans === "caroussel4") {
    //             setTrans("caroussel0")
    //         } 
    //     } else if (e.target.id === "gauche") {
    //         if (trans === "caroussel0") {
    //             setTrans("caroussel4")
    //         } else if (trans === "caroussel4") {
    //             setTrans("caroussel3")
    //         } else if (trans === "caroussel3") {
    //             setTrans("caroussel2")
    //         } else if (trans === "caroussel2") {
    //             setTrans("caroussel1")
    //         } else if (trans === "caroussel1") {
    //             setTrans("caroussel0")
    //         }
    //     }
    // } 

    const getStyles = (index) => {
      if (activeSlide === index)
        return {
          opacity: 1,
          transform: "translateZ(0px) rotateY(0deg)",
          zIndex: 10
        };
      else if (activeSlide - 1 === index)
        return {
          opacity: 1,
          transform: "translateZ(-400px) rotateY(35deg)",
          zIndex: 9
        };
      else if (activeSlide + 1 === index)
        return {
          opacity: 1,
          transform: "translateZ(-400px) rotateY(-35deg)",
          zIndex: 9
        };
      else if (activeSlide - 2 === index)
        return {
          opacity: 1,
          transform: "translateZ(-500px) rotateY(35deg)",
          zIndex: 8
        };
      else if (activeSlide + 2 === index)
        return {
          opacity: 1,
          transform: "translateZ(-500px) rotateY(-35deg)",
          zIndex: 8
        };
      else if (index < activeSlide - 2)
        return {
          opacity: 0,
          transform: "translateZ(-500px) rotateY(35deg)",
          zIndex: 7
        };
      else if (index > activeSlide + 2)
        return {
          opacity: 0,
          transform: "translateZ(-500px) rotateY(-35deg)",
          zIndex: 7
        };
    };

    window.onscroll = () => {
      let divWanted = document.querySelector(".wantedBest")
      let top = window.scrollY;
      let offset = divWanted.offsetTop - 150;
      let height = divWanted.offsetHeight;

      if (top >= offset && top < offset + height) {
        setDisplay(true)
      } else {
        setDisplay(false)
      }
    }

  return (
    dataState === true ?
    <div className="divHome">
      <div className={burger === false ? "navRes" : "navResActive"}>
      <div className='navPagesBurger'>
                    <Link href="/" className='pagesHome'><div className={theClass === "home" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("home")}><img src="/assets/img/sunny2.jpg" alt="" />Home</div></Link>
                    <Link href="/pirates" className='pagesPirate'><div className={theClass === "pirate" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("pirate")}><img src="/assets/img/skullIcon.png" alt="" /> Pirates</div></Link>
                    {connexion === true &&
                        <div className='hiddenLinks'>
                            <Link href="/favoris" className='pagesFavoris'><div className={theClass === "favoris" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("favoris")}><img src="/assets/img/etoile.png" alt="" /> Favoris({favoris.length})</div></Link>
                            <Link href="/comissions" className='pagesMission'><div className={theClass === "mission" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("mission")}><img id='bottleBurger' src="/assets/img/bottle2.jpg" alt="" /> Commissions({tableau.length})</div></Link>
                        </div>
                    }
                    {connexion === true && <Link href="/login" className='pagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("connexion")}>Connected as {user[0].name}</div></Link> }
                    {connexion === false && <Link href="/login" className='pagesConnexion'><div className={theClass === "connexion" ? 'scrollPanierActiveBurger' : "scrollPanierBurger"} onClick={()=>setTheClass("connexion")}>Connexion/Inscription</div></Link>}
                </div>
      </div>
    {/* <div className="heroHome"></div> */}
      <div className={theme === "light" ? 'homeCarouselLight' : "homeCarouselDark"}>
        <div className='container'>
        {dataState === true ?
          <div className={trans}>
              <div className={tearOff ? "tearOff" : "slide"} onClick={()=>goPirate(filtPerso[random1]?.id)} style={{...getStyles(0)}}>
                <div className='nameWanted'>
                  <div>{filtPerso[random1]?.name.toUpperCase()}</div>
                </div>
                {
                  imgPerso.map((imgP, index) => (
                    filtPerso[random1]?.id === imgP.id ? <img key={index} className="imgPerso" src={imgP.img} alt=""/>:null 
                    ))
                  }
                <div className='bountyWanted'>
                  <p>{filtPerso[random1]?.bounty}</p>
                </div>
              </div>
              <div id="1" className={tearOff ? "tearOff" : "slide"} onClick={()=>goPirate(filtPerso[random2]?.id)} style={{...getStyles(1)}}>
                <div className='nameWanted'>
                  <div>{filtPerso[random2]?.name.toUpperCase()}</div>
                </div>
                {
                  imgPerso.map((imgP, index) => (
                    filtPerso[random2]?.id === imgP.id ? <img key={index} className="imgPerso" src={imgP.img} alt=""/>:null 
                    ))
                  }
                <div className='bountyWanted'>
                  <p>{filtPerso[random2]?.bounty}</p>
                </div>
              </div>
              <div id="2" className={tearOff ? "tearOff" : "slide"} onClick={()=>goPirate(filtPerso[random3]?.id)} style={{...getStyles(2)}}>
                <div className='nameWanted'>
                  <div>{filtPerso[random3]?.name.toUpperCase()}</div>
                </div>
                {
                  imgPerso.map((imgP, index) => (
                    filtPerso[random3]?.id === imgP.id ? <img key={index} className="imgPerso" src={imgP.img} alt=""/>:null 
                    ))
                  }
                <div className='bountyWanted'>
                  <p>{filtPerso[random3]?.bounty}</p>
                </div>
              </div>
              <div id="3" className={tearOff ? "tearOff" : "slide"} onClick={()=>goPirate(filtPerso[random4]?.id)} style={{...getStyles(3)}}>
                <div className='nameWanted'>
                  <div>{filtPerso[random4]?.name.toUpperCase()}</div>
                </div>
                {
                  imgPerso.map((imgP, index) => (
                    filtPerso[random4]?.id === imgP.id ? <img key={index} className="imgPerso" src={imgP.img} alt=""/>:null 
                    ))
                  }
                <div className='bountyWanted'>
                  <p>{filtPerso[random4]?.bounty}</p>
                </div>
              </div>
              <div id="4" className={tearOff ? "tearOff" : "slide"} onClick={()=>goPirate(filtPerso[random5]?.id)} style={{...getStyles(4)}}>
                <div className='nameWanted'>
                  <div>{filtPerso[random5]?.name.toUpperCase()}</div>
                </div>
                {
                  imgPerso.map((imgP, index) => (
                    filtPerso[random5]?.id === imgP.id ? <img key={index} className="imgPerso" src={imgP.img} alt=""/>:null 
                    ))
                  }
                <div className='bountyWanted'>
                  <p>{filtPerso[random5]?.bounty}</p>
                </div>
              </div>
            </div> : <Loading/>
            }
        </div> 
        {/* <div className='fleches'>
            <div className="fleche" id="gauche" onClick={mouv}>←</div>
            <div className="fleche" id="droite" onClick={mouv}>→</div>
        </div>    */}
      </div>
      <div className={theme === "light" ? "hallLight" : "hallDark"}>HALL OF FAME</div>
      <div className="mappingHall">
                {dataState === true ? (
                filtPerso.filter(l => l.name === "Monkey D Luffy" 
                || l.name === "Trafalgar D. Water Law"
                || l.name === "Eustass Kidd"
                || l.name === "Charlotte Linlin / Big Mom"
                || l.name === "Charlotte Dent-de-chien"
                || l.name === "Charlotte Smoothie"
                || l.name === "Charlotte Cracker"
                || l.name === "Charlotte Slurp"
                || l.name === "Kaido"
                || l.name === "King"
                || l.name === "Queen"
                || l.name === "Jack"
                || l.name === "Marchall D. Teach / Barbe Noire"
                || l.name === "Gol D. Roger"
                || l.name === "Edward Newgate / Barbe Blanche"
                || l.name === "Portgas D. Ace"
                || l.name === "Don Quijote Doflamingo"
                || l.name === "Marco"
                ).map((pers, index) => (
                    <div className="wantedWrapper">
                        {/* <div className="starDivCard">
                            <svg className="starCard" viewBox='0 0 100 100' onClick={()=>changeStar()}>
                                <g className="starCard">
                                    <path d="M 50 4 61.23 38.55 97.55 38.55 68.16 59.9 79.39 94.45 50 73.1 20.6 94.45 31.84 59.9 2.45 38.55 38.77 38.55 z" />
                                    <path class="starEXCard" d="M 50 4 61.23 38.55 97.55 38.55 68.16 59.9 79.39 94.45 50 73.1 20.6 94.45 31.84 59.9 2.45 38.55 38.77 38.55 z" />
                                </g>
                            </svg>
                        </div> */}
                        <div key={index} className={tearOff ? "tearOff" : display ? "wantedBestDisplay" : "wantedBest"} onClick={()=>goPirate(pers.id)}>
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
                ))
                ) : null
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
        {/* <ModalBurger/> */}
    </div> : <Loading/> 
    
  );
}
