import { Position } from "../../../../models/Position";
import { generateTroopPoint } from "../random/randomizeTroops";

export const renderTroops = (ctx: CanvasRenderingContext2D, matrixA: Position[][], matrixB: Position[][]) => {
    matrixA.forEach(row => {
        row.forEach(point => {
            if(point.troop && point.troop.life > 0)
            generateTroopPoint(ctx, point, point.troop.type, "A")
        })
    })
    matrixB.forEach(row => {
        row.forEach(point => {
            if(point.troop && point.troop.life > 0)
            generateTroopPoint(ctx, point, point.troop.type, "B")
        })
    })
}