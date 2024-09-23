self.addEventListener("message", (e) => {
    
    const [attackedParty, attackerParty, multiplier, matrixLength, isPrecise] = e.data
    const randomize = ( size, start = 0) => {
        return start + Math.floor(Math.random() * size)     
    }

    let success = false, killed = false
    const attacker = attackerParty.troops[randomize(attackerParty.troops.length - 1)]
    const damage = randomize(attacker.troop.damage) * multiplier
    let pointToAttack, i, j

    if(isPrecise){
        do {
            i = randomize(matrixLength - 1)
            j = randomize(matrixLength - 1)
            pointToAttack = attackedParty.gameMatrix[i][j]
            console.log(!attackerParty.failedPoints.includes(pointToAttack) && !attackerParty.enemysDown.includes(pointToAttack))
        } while(
            attackerParty.failedPoints.includes(pointToAttack) || 
            attackerParty.enemysDown.includes(pointToAttack) || !pointToAttack.troop
        )
    } else {
        do {
            i = randomize(matrixLength - 1)
            j = randomize(matrixLength - 1)
            pointToAttack = attackedParty.gameMatrix[i][j]
            console.log(!attackerParty.failedPoints.includes(pointToAttack) && !attackerParty.enemysDown.includes(pointToAttack))
        } while(
            attackerParty.failedPoints.includes(pointToAttack) || 
            attackerParty.enemysDown.includes(pointToAttack)
        )
    }

    if(pointToAttack.troop){
        const newLife = pointToAttack.troop.life - damage
        success = true
        console.log('le diste')
        if(newLife > 0) {
            attackedParty.gameMatrix[i][j].troop.life = newLife
        } else {
            killed = true
            attackerParty.money = attackerParty.money * 1.15
            attackerParty.enemysDown.push(pointToAttack)
            attackedParty.gameMatrix[i][j].troop.life = 0
        }
    } else {
        attackerParty.failedPoints.push(pointToAttack)
    }

    console.log(attackerParty)

    self.postMessage([success, attackerParty, attackedParty, pointToAttack, damage, killed])
})