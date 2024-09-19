export type TroopType = "Infantry" | "Tank" | "Canion" | "Plane" 

export default interface Troop {
    path: Path2D
    type: TroopType
    life: number
    damage: number
    color: string
}
