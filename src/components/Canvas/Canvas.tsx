import { useEffect, useRef, useState } from "react"
import './Canvas.css'
import { renderGrid } from "./utils/render/renderGrid"
import { getMatrix } from "./utils/getMatrix"
import { getRandomPosition } from "./utils/random/getRandomPositions"
import { randomizeTroops } from "./utils/random/randomizeTroops"
import { Position } from "../../models/Position"
import { randomizeDamage } from "./utils/random/randomizeDamage"
import { renderTroops } from "./utils/render/renderTroops"
import PartyInfo from "../../models/PartyInfo"
import { formatMoney } from "./utils/format/formatMoney"
import { randomize } from "./utils/random/randomize"

const partyDefault: PartyInfo  = {
    enemysDown: [],
    gameMatrix: [],
    failedPoints: [],
    money: randomize(1_000_000),
    troops: []
}

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [started, setStarted] = useState(false)
    const [whosTurn, setWhosTurn] = useState<"A" | "B">("A")
    const [partyPlayerA, setPartyPlayerA] = useState<PartyInfo>(partyDefault)
    const [partyPlayerB, setPartyPlayerB] = useState<PartyInfo>(partyDefault)

    const [matrixA, setMatrixA] = useState<Position[][]>()
    const [matrixB, setMatrixB] = useState<Position[][]>()
    const [moneyA, setMoneyA] = useState(50_000)

    // useEffect(() => {
    //     randomizeWorker(500_000, 500_000).onmessage = (e) => {
    //         setPartyPlayerA(prev => ({...prev, money: e.data}))
    //         setPartyPlayerB(prev => ({...prev, money: e.data}))
    //     }
    // }, [])

    useEffect(() => {
        console.log(partyPlayerA)
        console.log(partyPlayerB)
    }, [partyPlayerA, partyPlayerB])

    const startGame = () => {
        setStarted(true)
        const ctx = canvasRef.current?.getContext("2d")

        if(canvasRef.current && ctx) {
            const vw = canvasRef.current.width
            const vh = canvasRef.current.height

            ctx.moveTo(vw /2, vh /2)
            renderGrid(ctx, vw, vh)
            const [matrixA, matrixB] = getMatrix(vw, vh)
            console.log(matrixA, matrixB)
            setPartyPlayerA(prev => ({
                ...prev,
                gameMatrix: matrixA
            }))
            setPartyPlayerB(prev => ({
                ...prev,
                gameMatrix: matrixB
            }))
            randomizeTroops(ctx, matrixA, matrixB)
        }
    }   

    const shoot = (whosTurn: "A" | "B") => {
        const ctx = canvasRef.current?.getContext("2d")

        if(partyPlayerA.gameMatrix && partyPlayerB.gameMatrix && ctx && canvasRef.current){
            randomizeDamage(
                whosTurn == "A" ? partyPlayerB.gameMatrix : partyPlayerA.gameMatrix,
                ctx, 
                whosTurn == "A" ? partyPlayerA.failedPoints : partyPlayerB.failedPoints,
                whosTurn == "A" ? (failed: Position[]) => {
                    setPartyPlayerA(prev => ({
                        ...prev,
                        failedPoints: failed
                    }))
                } : (failed: Position[]) => {
                    setPartyPlayerB(prev => ({
                        ...prev, 
                        failedPoints: failed
                    }))
                }
            )
            renderGrid(ctx, canvasRef.current.width, canvasRef.current.height)
            renderTroops(ctx, partyPlayerA.gameMatrix, partyPlayerB.gameMatrix)
            if(whosTurn == "A") {
                setWhosTurn("B")
            } else {
                setWhosTurn("A")
            }
        }
    }
  return (
    <article className="container-game">
        <div className="container-party">
            <h2>Jugador 1</h2>
            <span>{formatMoney(partyPlayerA.money)}</span>
            <form className="container-buttons" >
                <button onClick={() => shoot(whosTurn)} disabled={whosTurn == "B"}>
                    Fuego !!!
                </button>
                <button>
                    Dano x 2
                </button>
                <button>
                    Tiro de la Suerte
                </button>
                <button>
                    Dano x 3
                </button>
                <button>
                    Dano x 5
                </button>
                <button>
                    Disparo Certero
                </button>
                <button>
                    Investigacion de Campo
                </button>
                <button>
                    Bomba de Racimo
                </button>
                <button>
                    Domo de Hierro
                </button>
            </form>
        </div>
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
        </div>
        <div className="container-party">
            <h2>Jugador 2</h2>
            <span>{formatMoney(partyPlayerB.money)}</span>
            <div className="container-buttons">
                <button onClick={() => shoot(whosTurn)} disabled={whosTurn == "A"}>
                    Fuego !!!
                </button>
                <button>
                    Dano x 2
                </button>
                <button>
                    Tiro de la Suerte
                </button>
                <button>
                    Dano x 3
                </button>
                <button>
                    Dano x 5
                </button>
                <button>
                    Disparo Certero
                </button>
                <button>
                    Investigacion de Campo
                </button>
                <button>
                    Bomba de Racimo
                </button>
                <button>
                    Domo de Hierro
                </button>
            </div>

        </div>
    </article>
    
  )
}
