import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'
import { useRef, useState, useEffect } from 'react'

export default function AlertTx({ isOpen }) {
  const { open, setOpen } = useState(isOpen)
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])
  const cancelRef = useRef()

  return (
    <>
      <AlertDialog
        isOpen={open}
        leastDestructiveRef={cancelRef}
        onClose={() => setOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Transaction failed
            </AlertDialogHeader>

            <AlertDialogBody>Try again</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setOpen(false)}>Ok</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
