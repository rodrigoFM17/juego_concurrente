import { randomize } from "./randomize"

export const getRandomPosition = () => {

    // const nPoints = parseInt(import.meta.env.VITE_DIVISION_LINES) - 1
    // randomizeWorker(nPoints).onmessage = e => {
    //     i = e.data
    // }
    // randomizeWorker(nPoints).onmessage = e => {
    //     j = e.data
    // }

    const nPoints = parseInt(import.meta.env.VITE_DIVISION_LINES) - 1
    const i = randomize(nPoints), j = randomize(nPoints)
    console.log(i, j)
    return [i,j]
}