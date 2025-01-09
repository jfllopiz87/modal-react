import { useState } from 'react'
import Modal from './components/Modal'

function App() {
  
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <h1> Testing Modal</h1>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default App;