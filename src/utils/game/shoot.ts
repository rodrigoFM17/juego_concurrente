import { renderExplosion } from "../../components/Canvas/utils/render/renderExplosion";
import { defenseMultiplier, fireDecreaser, multipleShootDecreaser, preciseDecreaser } from "../../constants/constansGame";
import PartyInfo from "../../models/PartyInfo";

export const shoot = (
  ctx: CanvasRenderingContext2D,
  attackerParty: PartyInfo,
  attackedParty: PartyInfo,
  setAttackerParty: React.Dispatch<React.SetStateAction<PartyInfo>>,
  setAttackedParty: React.Dispatch<React.SetStateAction<PartyInfo>>,
  whosTurn: "A" | "B",
  multiplier = 1,
  luckyShoot = false,
  multipleShot = false,
  isPrecise = false,
  isProtected = false
) => {
  const matrixLength = parseInt(import.meta.env.VITE_DIVISION_LINES) - 1

  console.log(attackerParty, attackedParty)

  for(let i=1; i <= (multipleShot ? 5 : 1); i++) {
    const worker = new Worker("./src/utils/workers/randomizeShoot.js")
    worker.postMessage([attackedParty, attackerParty, multiplier, matrixLength, isPrecise])
    worker.onmessage = (e) => {
      const [success, attackerParty, attackedParty, attackedPoint, damage] = e.data
      console.log(success, damage)
      
      if(isPrecise){
        attackerParty.money = Math.round(attackerParty.money * preciseDecreaser)
      } else if(multipleShot) {
        attackerParty.money = Math.round(attackerParty.money * multipleShootDecreaser)
      } else {
        attackerParty.money = Math.round(attackerParty.money - attackerParty.money * fireDecreaser * multiplier)
      }

      if(isProtected){
        attackedParty.money = Math.round(attackerParty.money * defenseMultiplier)
      }
      
      renderExplosion(
        ctx, 
        attackedPoint, 
        whosTurn == "A" ? attackerParty.gameMatrix : attackedParty.gameMatrix, 
        whosTurn == "A" ? attackedParty.gameMatrix : attackerParty.gameMatrix
      )

      setAttackerParty({...attackerParty})
      if(success) {
        setAttackedParty({...attackedParty})
      }
      if(luckyShoot) {
        const luckyMultiplier = parseFloat(import.meta.env.VITE_LUCKY_MULTIPLIER)
        const luckyDecresear = parseFloat(import.meta.env.VITE_LUCKY_DECREASER)
        setAttackerParty({
          ...attackerParty,
          money: Math.round(attackerParty.money * (success ? luckyMultiplier : luckyDecresear))
        })
      }
    }
  }

};
