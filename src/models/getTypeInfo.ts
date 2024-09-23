import { TroopType } from "./Troop"
import soldierA from '../assets/images/soldierA.png'
import soldierB from '../assets/images/soldierB.png'
import tankA from '../assets/images/tankA.png'
import tankB from '../assets/images/tankB.png'
import planeA from '../assets/images/planeA.png'
import planeB from '../assets/images/planeB.png'
import cannonA from '../assets/images/cannonA.png'
import cannonB from '../assets/images/cannonB.png'

export const getTypeInfo = (type: TroopType, matrix: "A" | "B"): [number, number, string, string] => {
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