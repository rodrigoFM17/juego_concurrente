import { Position } from "../../../../models/Position";
import { getRandomPosition } from "./getRandomPositions";
import explosion from '../../../../assets/images/nuclear.webp'
import { renderExplosion } from "../render/renderExplosion";
import PartyInfo from "../../../../models/PartyInfo";
import { randomizeWorker } from "../workers/randomizeWorker";
import { randomize } from "./randomize";

export const randomizeDamage = (
    matrixToAttack: Position[][], 
    ctx: CanvasRenderingContext2D, 
    failedPoints: Position[],
    setFailedPoints: any
) => {
    let pointToAttack
    
    do{
        const [i,j] = getRandomPosition()
        pointToAttack = matrixToAttack[i][j]
    } while (failedPoints.includes(pointToAttack))

    let damage = randomize(1_000_000)
    if(pointToAttack.troop){
        renderExplosion(ctx, pointToAttack)
        const newLife = pointToAttack.troop.life - damage
        if(newLife <= 0) {
            pointToAttack.troop.life = 0
            alert("muerto")
        } else {
            pointToAttack.troop.life = newLife
        }
        // for(let i=0.1; i < 1; i = i + 0.1){
        //     // ctx.save()
        //     ctx.globalAlpha = i
        //     imgExplosion.addEventListener("load", () => {
        //         ctx.drawImage(imgExplosion, pointToAttack.x - 20,pointToAttack.y - 20,40, 40,)
        //     })
        //     imgExplosion.src = explosion
            
        // }
        
        console.log(damage)
        console.log(pointToAttack.troop)
    } else {
        renderExplosion(ctx, pointToAttack)
        failedPoints.push(pointToAttack)
        setFailedPoints([...failedPoints])
    }
}