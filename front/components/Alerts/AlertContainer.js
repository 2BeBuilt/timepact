import { Flex, Grid } from '@chakra-ui/react'

export default function AlertContainer({ children }) {
  return (
    <Grid
      gap={4}
      mt={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Grid>
  )
}
