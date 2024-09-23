
export const renderLife = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    w:number, 
    currentLife: number, 
    maxLife: number
) => {
    const radius = parseInt(import.meta.env.VITE_RADIUS_TROOP)
    // const lifePath = new Path2D()
    // ctx.fillStyle = 'white'
    // lifePath.rect(x - 10, y - 15, w, 5)
    // ctx.fillStyle = "red"
    // // const lifeWidth = (currentLife / maxLife) * w
    // lifePath.rect(x - 10, y - 15, 10 , 5)
    // ctx.fill(lifePath)
    if(currentLife !== maxLife){
        ctx.fillStyle = 'white'
        ctx.fillRect(x - radius, y - (radius + radius / 2), w, 5)
        ctx.fill()
        ctx.fillStyle = "red"
        const lifeWidth = (currentLife / maxLife) * w
        ctx.fillRect(x - radius, y - (radius + radius / 2), lifeWidth , 5)
        ctx.fill()
    }
}