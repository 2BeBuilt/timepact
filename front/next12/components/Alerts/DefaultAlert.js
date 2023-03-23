import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Flex,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

export default function DefaultAlert({ isOpen, status, title, description }) {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: isOpen })
  return isVisible && isOpen ? (
    <Alert
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      width="500px"
    >
      <Flex direction="column" alignItems="center" justifyContent="center">
        <AlertIcon boxSize="40px" mr={0} />
        <Box>
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {title}
          </AlertTitle>
          <AlertDescription maxWidth="sm">{description}</AlertDescription>
        </Box>
        <CloseButton mt={4} onClick={onClose} />
      </Flex>
    </Alert>
  ) : (
    <></>
  )
}
