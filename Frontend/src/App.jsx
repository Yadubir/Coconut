import { useState } from 'react'
import './App.css'
import './style.css'
import { Button } from './components/ui/button'
import Signup from './components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Button>Click here</Button> */}
      <Signup />
    </>
  )
}

export default App
