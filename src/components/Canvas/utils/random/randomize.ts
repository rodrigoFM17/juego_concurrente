
export const randomize = ( size:number, start:number = 0) => {
    return start + Math.floor(Math.random() * size) 
}