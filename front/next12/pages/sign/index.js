import { Button } from '@chakra-ui/react'
import { useState } from 'react'

export default function Sign() {
  const [error, setError] = useState(null)
  return (
    <>
      <main>
        <Button
          size="sm"
          onClick={() => {
            setError(true)
          }}
        >
          Button
        </Button>
      </main>
    </>
  )
}
