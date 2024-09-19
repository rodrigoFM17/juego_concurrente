import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canvas from './components/Canvas/Canvas'

function App() {
  const [count, setCount] = useState(0)


  return (
    <section className='main-container'>
      <h1>CryptoWars</h1>
      <Canvas />
    </section>
  )
}

export default App
