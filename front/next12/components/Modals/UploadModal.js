import {
  ModalOverlay,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Input,
  ModalFooter,
  SimpleGrid,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export default function UploadModal({ isOpen, onClose }) {
  const [open, setOpen] = useState(isOpen)
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px) " />
  const [overlay, setOverlay] = useState(<OverlayOne />)
  return open ? (
    <>
      <Modal isCentered isOpen={open} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Choose the exposure date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="center" justify="center">
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                width="200"
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <SimpleGrid columns={2} spacing={2}>
              <Button onClick={onClose}>Close</Button>
              <Button onClick={onClose}>Ok</Button>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <></>
  )
}
