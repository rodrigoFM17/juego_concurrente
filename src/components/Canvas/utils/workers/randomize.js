

self.addEventListener("message", (e) => {
    let {start = 0, size} = e.data
    console.log(start, size)
    
    self.postMessage(start + Math.floor(Math.random() * size)) 
})
// export const randomize = ( size:number, start:number = 0) => {
//     return start + Math.floor(Math.random() * size) 
// }