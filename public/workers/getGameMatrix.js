

self.addEventListener("message", (e) => {
    console.log("engro")
    const {width, height, divisionLines} = e.data
    console.log(width, height)

    const stepWidthSize = (width/2) / divisionLines
    const stepHeightSize = (height) / divisionLines
    const positionsPlayerA = []
    const positionsPlayerB = []
    console.log(divisionLines)

    for (let i=1; i < divisionLines; i++){
        let rowA = [], rowB = []
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

    self.postMessage([positionsPlayerA, positionsPlayerB])
    // return [positionsPlayerA, positionsPlayerB]
})
