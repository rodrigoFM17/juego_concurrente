
export const renderGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const divisionLines = parseInt(import.meta.env.VITE_DIVISION_LINES)
    const stepWidthSize = (width/2) / divisionLines
    const stepHeightSize = (height) / divisionLines
    ctx.fillStyle = "#6B6B6B"

    for(let i=1; i < divisionLines; i++){
        ctx.fillRect(stepWidthSize * i, 0, 1, height)
        ctx.fillRect(stepWidthSize * i + width / 2, 0, 1, height)
        ctx.fillRect(0, stepHeightSize * i, width, 1)
    }

    ctx.fillStyle = "red"
    ctx.fillRect(width/2 -2.5, 0, 5, height)
}