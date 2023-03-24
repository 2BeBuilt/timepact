import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Flex,
  Link,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export default function LinkAlert({ isOpen, status, title, url }) {
  const [open, setOpen] = useState(isOpen)
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return open ? (
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
          <AlertDescription maxWidth="sm">
            <Link href={url} isExternal>
              {url}
            </Link>
          </AlertDescription>
        </Box>
        <CloseButton mt={4} onClick={() => setOpen((prev) => !prev)} />
      </Flex>
    </Alert>
  ) : (
    <></>
  )
}
