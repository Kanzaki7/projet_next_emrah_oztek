"use client"

import "./panier.css"
import { useDispatch, useSelector, useStore } from 'react-redux'
import { deleteCart, checkOut, plusUn, moinsUn } from "@/lib/features/MissionsSlice";
import { addTotal, subTotal, removeTotal } from "@/lib/features/TotalSlice";
import { useState } from "react";

export default function Panier(props) {

const tableau = useSelector((state) => state.missions.value)
const total = useSelector((state) => state.total.value)
const theme = useSelector((state) => state.theme.value)
console.log(tableau);
const dispatch = useDispatch();
const [mission, setMission] = useState("")
const [crew, setCrew] = useState("")
const [diff, setDiff] = useState("")
const [totalContrat, setTotalContrat] = useState(0)
const [display, setDisplay] = useState(false)
const [stamp, setStamp] = useState("")
const [form, setForm] = useState(false)
const [state, setState] = useState(-1)


let deleteAll = (index) => {
    setState(index)
    // setEtatTab("supprimé")
    setTimeout(() => {
        dispatch(subTotal(tableau[index].total))
        dispatch(deleteCart(index))
        setState(-1)
    }, 2000);
}

let noTotal = () => {
    setStamp("stamp")
    setTimeout(() => {
        dispatch(checkOut())
        dispatch(removeTotal())
    }, 3000);
}

let addOne = (index) => {
    dispatch(plusUn(index))
    dispatch(addTotal(tableau[index].bounty))
}
let removeOne = (index) => {
    dispatch(moinsUn(index))
    if (tableau[index].quantity > 0) {
        dispatch(subTotal(tableau[index].bounty))
    }
}

let captureInput = (e) => {
        if (e.target.id === "mission") {
            setMission(e.target.value)
            console.log(mission);
        } else if (e.target.id === "crew") {
            setCrew(e.target.value)
            console.log(crew);
        }
    }
    
let soummetre = () => {
    if (mission != "" && crew != "" && diff != "") {
        setDisplay(true)
        setTotalContrat(total)
    } else {
        setForm(true)
    }
}

return(
    <div className='panier'>
        <div className='cartTab'>
            {
                tableau.map((tab, index) => (
                    <div key={index} id={index} className={state === index ? "supprimé" : "tableau"}>
                        <div className="divTab">{tab.name}</div>
                        <div className="divTab">{tab.bountyString} <img className="berryCom" src={"/assets/img/berry.jpg"} alt="" /></div>
                        <div className="divTabSmall">{tab.quantity} Jours</div>
                        <div className="divTab">{tab.total}{tab.name ===  "MONKEY D LUFFY" ? "00.000.000" :  tab.name ===  "TONY-TONY CHOPPER" ? "" : ".000.000"} <img className="berryCom" src={"/assets/img/berry.jpg"} alt="" /></div>
                        <div className="divTabScroll">
                            <div className="btnScrollRight" onClick={()=>addOne(index)}>+1</div>
                            <div className="btnScrollLeft" onClick={()=>removeOne(index)}>-1</div>
                        </div>
                        <div className="divTabSmall">
                            <div className='supprimerBtn' onClick={()=>deleteAll(index)}></div>
                        </div>
                    </div>
                ))
            }
            <div className={theme === "light" ? "totalLight" : "totalDark"}>TOTAL : {total}.000.000 <img className="berryCom" src={"/assets/img/berry.jpg"} alt="" /></div>
        </div>
        <div className="contrat">
            <div className="contratTitle">Contrat</div>
            {display === false && 
                <div className="formContrat">
                {form === true && <div>Veuillez remplir les champs !</div> }
                    <div>
                        <div>Nom de la mission:</div>
                        <input type="text" id="mission" value={mission} onChange={(e)=>captureInput(e)}/>
                    </div>
                    <div>
                        <div>Nom de l'équipage:</div>
                        <input type="text" id="crew" value={crew} onChange={(e)=>captureInput(e)}/>
                    </div>
                    <select name="difficulté" id="diff" onChange={(e)=>setDiff(e.target.value)}>
                        <option value="">Difficulté de la mission</option>
                        <option value="S">S</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                    <div className="nameWantedBtn" onClick={()=>soummetre()}>Soumettre</div>
                </div>
            }
            {display === true &&
                <div>
                    <div className="contratText">
                    En échange d'un montant de <span className="ligne">{totalContrat}.000.000</span><img className="berryCom" src={"/assets/img/berry.jpg"} alt="" />, l'équipage <span className="ligne">{crew}</span> s'engage à accomplir avec succes la mission <span className="ligne">{mission}</span>.
                </div>
                <div className="contratClass">
                    Degré de difficulté : <span className="ligne">{diff}</span>
                </div>
                <div className="btnContrat">
                    <div className="nameWantedMission" onClick={()=>noTotal()}>Lancer la mission</div>
                </div>
                <div className="signature">Signature</div>
                <div class={stamp}></div>
                </div>
            }
        </div>
    </div>
)
}