
export const randomizeWorker = () => {
    let random = 0
    const worker = new Worker("./src/components/Canvas/utils/random/randomize.js")
    // worker.postMessage({size, start})
    

    return worker
}