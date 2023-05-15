import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from 'wagmi'
import contractAbi from '@/utils/constants/abiScrollBridge.json'
import {
  Spinner,
  Flex,
  Tooltip,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  SimpleGrid,
  Text,
  Button,
  ModalFooter,
} from '@chakra-ui/react'
import { scroll } from '@/utils/constants/addresses'
import { useState } from 'react'

export default function SendPact({ from, tokenId }) {
  const [to, setTo] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: scroll,
    abi: contractAbi,
    functionName: 'transferFrom',
    args: [from, to, tokenId],
  })

  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleAddressChange = (e) => {
    setTo(e.target.value)
  }

  if (isSuccess) window.location.reload(false)

  return (
    <>
      <Tooltip label={isLoading ? 'Transfering...' : 'Transfer'} fontSize="md">
        <Flex
          cursor="pointer"
          onClick={!isLoading ? () => setModalOpen(true) : () => {}}
        >
          {isLoading ? (
            <Spinner size="md" />
          ) : (
            <Image
              borderRadius="full"
              boxSize="30px"
              src="send.png"
              alt="transfer icon"
            />
          )}
        </Flex>
      </Tooltip>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="to"
              onChange={handleAddressChange}
            />
          </ModalBody>
          <ModalFooter>
            <SimpleGrid columns={2} spacing={2}>
              <Button onClick={write}>Ok</Button>
              <Button onClick={() => setModalOpen(false)}>Close</Button>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
