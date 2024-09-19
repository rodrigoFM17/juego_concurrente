import { Position } from "./Position";

export default interface PartyInfo {
    gameMatrix: Position[][]
    troops: Position[]
    failedPoints: Position[]
    enemysDown: Position[]
    money: number
}