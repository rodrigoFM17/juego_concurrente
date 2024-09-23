import { useEffect, useRef, useState } from "react"
import './Canvas.css'
import { renderGrid } from "./utils/render/renderGrid"
import { getRandomPosition } from "./utils/random/getRandomPositions"
import { renderTroops } from "./utils/render/renderTroops"
import PartyInfo from "../../models/PartyInfo"
import { formatMoney } from "./utils/format/formatMoney"
import { randomize } from "./utils/random/randomize"
import { shoot } from "../../utils/game/shoot"
import { researchDecreaser } from "../../constants/constansGame"

const partyDefault: PartyInfo  = {
    enemysDown: [],
    gameMatrix: [],
    failedPoints: [],
    money: randomize(500_000, 500_000),
    troops: []
}

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [started, setStarted] = useState(false)
    const [generatedTroops, setGeneratedTroops] = useState(false)
    const [whosTurn, setWhosTurn] = useState<"A" | "B">("A")
    const [partyPlayerA, setPartyPlayerA] = useState<PartyInfo>(partyDefault)
    const [partyPlayerB, setPartyPlayerB] = useState<PartyInfo>(partyDefault)
    const [isProtected, setIsProtected] = useState(false)

    const [isFinished, setIsFinished] = useState(false)
    const [winner, setWinner] = useState<"A" | "B">("A")

    useEffect(() => {
        if(generatedTroops){
            console.log(partyPlayerA, partyPlayerB)
            const ctx = canvasRef.current?.getContext("2d")
            if(ctx && canvasRef.current){
                renderGrid(ctx, canvasRef.current.width, canvasRef.current.height)
                renderTroops(ctx, partyPlayerA.gameMatrix, partyPlayerB.gameMatrix)
            }
        }
        if(partyPlayerA.enemysDown.length >= 20 || partyPlayerB.money <=  50_000){
            setWinner("A")
            setIsFinished(true)
        }
        if(partyPlayerB.enemysDown.length >=20 || partyPlayerA.money <= 50_000){
            setWinner("B")
            setIsFinished(true)
        }
    }, [partyPlayerA, partyPlayerB, generatedTroops])
    
    useEffect(() => {

        if(partyPlayerA.gameMatrix && partyPlayerB.gameMatrix && started && !generatedTroops){

            const infantry = parseInt(import.meta.env.VITE_INFANTRY_NUMBER);
            const morter = parseInt(import.meta.env.VITE_MORTER_NUMBER);
            const cannon = parseInt(import.meta.env.VITE_CANION_NUMBER);
            const tanks = parseInt(import.meta.env.VITE_TANKS_NUMBER);
            const nPoints = parseInt(import.meta.env.VITE_DIVISION_LINES) - 1

            const randomizeTroopsWorker = new Worker("/workers/randomizeTroops.js")
            randomizeTroopsWorker.postMessage({infantry, morter, cannon, tanks, matrixA: partyPlayerA.gameMatrix, matrixB: partyPlayerB.gameMatrix, nPoints})
            randomizeTroopsWorker.onmessage = (e) => {
                const [matrixA, matrixB, troopsMatrixA, troopsMatrixB] = e.data

                setPartyPlayerA(prev => ({
                    ...prev,
                    gameMatrix: matrixA,
                    troops: troopsMatrixA
                }))
                setPartyPlayerB(prev => ({
                    ...prev,
                    gameMatrix: matrixB,
                    troops: troopsMatrixB
                }))

                const ctx = canvasRef.current?.getContext("2d") 
                if(ctx){
                    renderTroops(ctx, matrixA, matrixB)
                    setGeneratedTroops(true)
                }
            }
        } 
    }, [partyPlayerA, partyPlayerB, started, generatedTroops])   

    const startGame = () => {
        setStarted(true)
        const ctx = canvasRef.current?.getContext("2d")

        if(canvasRef.current && ctx) {
            const vw = canvasRef.current.width
            const vh = canvasRef.current.height
            const divisionLines = parseInt(import.meta.env.VITE_DIVISION_LINES)

            renderGrid(ctx, vw, vh)

            let worker
            if(typeof(Worker) !== "undefined"){
                if(typeof(worker) == "undefined"){  
                    worker = new Worker("/workers/getGameMatrix.js")
                    worker.postMessage({width: vw, height: vh, divisionLines})
                    worker.onmessage = (e) => {
                        const [matrixA, matrixB] = e.data

                        setPartyPlayerA(prev => ({
                            ...prev,
                            gameMatrix: matrixA
                        }))
                        setPartyPlayerB(prev => ({
                            ...prev,
                            gameMatrix: matrixB
                        }))
                    }
                }
            }
        }
    }   

    const protectMe = (whosTurn: "A" | "B") => {
        setIsProtected(true)
        const defensePrice = parseFloat(import.meta.env.VITE_DEFENSE_PRICE) 
        if(whosTurn == "A"){
            setPartyPlayerA(prev => ({
                ...prev,
                money: Math.round(prev.money * defensePrice)
            }))
        } else {
            setPartyPlayerB(prev => ({
                ...prev,
                money: Math.round(prev.money * defensePrice)
            }))
        }
        setWhosTurn(whosTurn == "A" ? "B" : "A")
    }

    const callShoot = (isProtected: boolean, lucky = false, multiplier = 1, multipleShoot = false, isPrecise = false) => {
        const ctx = canvasRef.current?.getContext("2d")
        setWhosTurn(whosTurn == "A" ? "B" : "A")
        if(ctx){
            shoot(
                ctx,
                whosTurn == "A" ? partyPlayerA : partyPlayerB, 
                whosTurn == "A" ? partyPlayerB : partyPlayerA,
                whosTurn == "A" ? setPartyPlayerA : setPartyPlayerB,
                whosTurn == "A" ? setPartyPlayerB : setPartyPlayerA,
                whosTurn,
                multiplier,
                lucky,
                multipleShoot,
                isPrecise,
                isProtected
            )
        }
    }

    const researchField = () => {
        let attackerParty, attackedParty, setAttacker
        if(whosTurn == "A"){
            attackerParty = partyPlayerA
            attackedParty = partyPlayerB
            setAttacker = setPartyPlayerA
        } else {
            attackerParty = partyPlayerB
            attackedParty = partyPlayerA
            setAttacker = setPartyPlayerB
        }

        const locations = attackerParty.failedPoints
        for (let i=0; i<10; i++){
            let pointToResearch

            do {
                const [j,k] = getRandomPosition()
                pointToResearch = attackedParty.gameMatrix[j][k]

            } while (attackerParty.enemysDown.includes(pointToResearch) || locations.includes(pointToResearch))
            locations.push(pointToResearch)
        }

        setAttacker(prev => ({
            ...prev,
            money: Math.round(prev.money * researchDecreaser),
            failedPoints: locations
        }))
        setWhosTurn(whosTurn == "A" ? "B" : "A")
    }
  return (
    <article className="container-game">
        
        <div className="container-canvas">  
            <canvas 
            id='canvas' 
            width={1280} 
            height={720} 
            ref={canvasRef}
            >
            </canvas>
            {
                !started && (
                    <div className="canvas-cover">
                        <div>
                            <button onClick={startGame}>
                                Iniciar Juego
                            </button>
                        </div>
                    </div>
                )
            }
            {
                isFinished && (
                    <div className="canvas-cover">
                        <span>El ganador es el jugador {winner}, recarga la pagina para reiniciar</span>
                    </div>
                )
            }
        </div>
        <div className="container-party-info">
            <h1>CryptoWars</h1>
            <span>Turno del jugador {whosTurn}</span>
            <div className="container-money">
                <span>{formatMoney(partyPlayerA.money)}</span>
                <span>{formatMoney(partyPlayerB.money)}</span>
            </div>
            <div className="container-buttons" >
                <button onClick={() => callShoot(isProtected)}>
                    Fuego !!!
                </button>
                <button onClick={() => callShoot(isProtected,false, 2)}>
                    Dano x 2
                </button>
                <button onClick={() => callShoot(isProtected,true)}>
                    Tiro de la Suerte
                </button>
                <button onClick={() => callShoot(isProtected,false, 3)}>
                    Dano x 3
                </button>
                <button onClick={() => callShoot(isProtected,false, 5)}>
                    Dano x 5
                </button>
                <button onClick={() => callShoot(isProtected,false, 1, false, true)}>
                    Disparo Certero
                </button>
                <button onClick={() => researchField()}>
                    Investigacion de Campo
                </button>
                <button onClick={() => callShoot(isProtected,false, 1, true)} disabled={isProtected}>
                    Bomba de Racimo
                </button>
                <button onClick={() => protectMe(whosTurn)}>
                    Domo de Hierro
                </button>
            </div>
        </div>
            

    </article>
    
  )
}
