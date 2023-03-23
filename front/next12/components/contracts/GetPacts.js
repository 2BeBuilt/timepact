import { useAccount } from 'wagmi'
import { Flex, SimpleGrid } from '@chakra-ui/react'
import Pact from './Pact'
import useBalanceOf from '@/hooks/useBalanceOf'
import convertToGateway from '@/utils/ipfsStringConverter'
import DefaultAlert from '../Alerts/DefaultAlert'
import AlertContainer from '../Alerts/AlertContainer'

export default function GetPacts({ address }) {
  const [amount] = useBalanceOf(address)

  const pacts = []
  for (let i = 0; i < amount; i++) {
    pacts.push({ key: i })
  }

  return (
    <>
      {amount != 0 ? (
        <SimpleGrid columns={5} spacing={10}>
          {pacts.map((pact) => (
            <Pact key={pact.key} index={pact.key} />
          ))}
        </SimpleGrid>
      ) : (
        <AlertContainer>
          <DefaultAlert
            isOpen={amount === 0}
            status="warning"
            title="sign a pact"
            description="You have no pacts yet!"
          />
        </AlertContainer>
      )}
    </>
  )
}
