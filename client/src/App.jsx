import { useState } from 'react'
import {Button} from '@nextui-org/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='text-xl'>HEWO there !!  {count}</p>
      <Button onPress={() => {
        setCount(count+1)
      }}
      color='primary'
      >Press me to increase da count !!!! 😈😈😈😈 
      </Button>
    </>
  )
}

export default App
