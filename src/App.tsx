import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canvas from './components/Canvas/Canvas'
import GameHelp from './components/GameHelp/GameHelp'

function App() {
  const [count, setCount] = useState(0)


  return (
    <section className='main-container'>
      
      <Canvas />
      <GameHelp />
    </section>
  )
}

export default App
