import { Position } from "../../../models/Position"

export const getMatrix = (width:number, height: number) => {
    const divisionLines = parseInt(import.meta.env.VITE_DIVISION_LINES)
    const stepWidthSize = (width/2) / divisionLines
    const stepHeightSize = (height) / divisionLines
    const positionsPlayerA: Position[][] = []
    const positionsPlayerB: Position[][] = []
    console.log(divisionLines)

    for (let i=1; i < divisionLines; i++){
        let rowA: Position[] = [], rowB: Position[] = []
        for(let j=1; j < divisionLines; j++) {
            rowA.push({
                x: stepWidthSize * i, 
                y: stepHeightSize * j
            })
            rowB.push({
                x: stepWidthSize * i + width / 2, 
                y: stepHeightSize * j
            })
        }
        positionsPlayerA.push(rowA)
        positionsPlayerB.push(rowB)
    }

    return [positionsPlayerA, positionsPlayerB]
}