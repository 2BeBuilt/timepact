import { useAccount } from 'wagmi'
import { SimpleGrid } from '@chakra-ui/react'
import Pact from './Pact'
import useBalanceOf from '@/hooks/useBalanceOf'
import convertToGateway from '@/utils/ipfsStringConverter'

export default function GetPacts({}) {
  const { address, connector, isConnected } = useAccount()
  const [amount] = useBalanceOf(address)

  const pacts = []
  for (let i = 0; i < amount; i++) {
    pacts.push({ key: i })
  }

  return (
    <>
      {amount != 0 && (
        <SimpleGrid columns={5} spacing={10}>
          {pacts.map((pact) => (
            <Pact key={pact.key} index={pact.key} />
          ))}
        </SimpleGrid>
      )}
    </>
  )
}
