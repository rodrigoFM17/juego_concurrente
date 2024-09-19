import { Position } from "../../../../models/Position"
import Troop, { TroopType } from "../../../../models/Troop"
import { renderLife } from "../render/renderLife"
import { getRandomPosition } from "./getRandomPositions"
import soldierA from '../../../../assets/images/soldierA.png'
import soldierB from '../../../../assets/images/soldierB.png'
import tankA from '../../../../assets/images/tankA.png'
import tankB from '../../../../assets/images/tankB.png'
import planeA from '../../../../assets/images/planeA.png'
import planeB from '../../../../assets/images/planeB.png'
import cannonA from '../../../../assets/images/cannonA.png'
import cannonB from '../../../../assets/images/cannonB.png'

const getLifeAndDamagePerType = (type: TroopType, matrix: "A" | "B"): [number, number, string, string] => {
    let damage, life

    switch(type){
        case "Infantry": 
            damage = 500_000, life = 1_000_000
            return [damage, life, "#D4E700", matrix == "A" ? soldierA : soldierB]
        case "Canion":
            damage = 3_000_000, life = 3_000_000
            return [damage, life, "#EBE18B", matrix == "A" ? cannonA : cannonB]
        case "Plane":
            damage = 1_500_000, life = 5_000_000
            return [damage, life, "#757575", matrix == "A" ? planeA : planeB]
        case "Tank": 
            damage = 5_000_000, life = 10_000_000
            return [damage, life, "#245F00", matrix == "A" ? tankA : tankB]
    }
}

export const generateTroopPoint = (ctx: CanvasRenderingContext2D, point: Position, type: TroopType, matrix: "A" | "B") => {
    const radius = parseInt(import.meta.env.VITE_RADIUS_TROOP)
    const path = new Path2D()
    const info = getLifeAndDamagePerType(type, matrix)
    if(info) {
    const [damage, life, color, imgSrc] = info
    ctx.fillStyle = color
    
    const troopImage = new Image()
    troopImage.addEventListener("load", () => {
        ctx.drawImage(troopImage, point.x - radius,point.y - radius, radius * 2, radius * 2)
    })
    
    troopImage.src = imgSrc
    // path.arc(point.x, point.y, radius, 0, 2 * Math.PI)
    // path.moveTo(point.x - 10, point.y - 15)
    // ctx.fill(path)   
    
    if(!point.troop){
        renderLife(ctx, point.x, point.y, radius * 2, life, life)
        point.troop = {
            path,
            color,
            type,
            damage,
            life
        }
    } else {
        renderLife(ctx, point.x, point.y, radius * 2, point.troop.life, life)
    }
    // const lifePath = new Path2D()
    // ctx.fillStyle = 'white'
    // lifePath.rect(point.x - 10, point.y - 15, 20, 5)
    // ctx.fillStyle = "red"
    // lifePath.rect(point.x - 10, point.y - 15, 20, 5)
    
    // ctx.fill(lifePath)

}
}

const generateTroopsPerType = (
    ctx: CanvasRenderingContext2D, 
    matrixA: Position[][], 
    matrixB: Position[][],
    troopsNumber: number, 
    type: TroopType
) => {


    for(let k=1; k <=  troopsNumber; k++){
        let pointA, pointB
        // randomizeWorker().postMessage({size: nPoints})
        // randomizeWorker().onmessage = e => {
        //     console.log(e.data)
        // }
        do {

            const [i, j] = getRandomPosition()
            pointA = matrixA[i][j] 
            // randomizeWorker(nPoints).onmessage = (e) => {
            //     i = e.data
            //     console.log(e.data)
            //     randomizeWorker(nPoints).onmessage = (e) => {
            //         j = e.data
            //         console.log(i,j)
            //         if(!matrixA[i][j].troop){
            //             pointA = matrixA[i][j]
            //         }
            //     }
            // }
            // getRandomPosition(i, j)
            // const [i, j] = getRandomPosition()
        } while (pointA.troop)
    
            // do {
            //     randomizeWorker(nPoints).onmessage = (e) => {
            //         i = e.data
            //         randomizeWorker(nPoints).onmessage = (e) => {
            //             j = e.data
            //             console.log(i,j)
            //             if(!matrixB[i][j].troop){
            //                 pointB = matrixB[i][j]
            //             }
            //         }
            //     }
                

            //     if(pointA && pointB){
            //         console.log('hehco')
            //         generateTroopPoint(ctx, pointA, type, "A")
            //         generateTroopPoint(ctx, pointB, type, "B")
            //     }
            //     // getRandomPosition(i, j)
            //     // const [i, j] = getRandomPosition()
            // } while (!pointB)

            

        do {
            const [i2, j2] = getRandomPosition()
            pointB = matrixB[i2][j2] 
        } while (pointB.troop)
        generateTroopPoint(ctx, pointA, type, "A")
        generateTroopPoint(ctx, pointB, type, "B")
    }

}

export const randomizeTroops = (
    ctx: CanvasRenderingContext2D, 
    matrixA: Position[][], 
    matrixB: Position[][]
) => {
    const infantryNumber = parseInt(import.meta.env.VITE_INFANTRY_NUMBER)
    const morterNumber = parseInt(import.meta.env.VITE_MORTER_NUMBER)
    const cannonNumber = parseInt(import.meta.env.VITE_CANION_NUMBER)
    const TanksNumber = parseInt(import.meta.env.VITE_TANKS_NUMBER)
    
    generateTroopsPerType(ctx, matrixA, matrixB, infantryNumber, "Infantry")
    generateTroopsPerType(ctx, matrixA, matrixB, TanksNumber, "Tank")
    generateTroopsPerType(ctx, matrixA, matrixB, morterNumber, "Plane")
    generateTroopsPerType(ctx, matrixA, matrixB, cannonNumber, "Canion")
}