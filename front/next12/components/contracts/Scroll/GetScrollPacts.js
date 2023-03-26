import { SimpleGrid } from '@chakra-ui/react'
import ScrollPact from './ScrollPact'
import useBalanceOf from '@/hooks/useBalanceOf'
import DefaultAlert from '../../Alerts/DefaultAlert'
import AlertContainer from '../../Alerts/AlertContainer'
import { scroll } from '@/utils/constants/addresses'
import abi from '@/utils/constants/abiScrollBridge.json'

export default function GetScrollPacts({ address }) {
  const [amount] = useBalanceOf(address, scroll, abi)
  const pacts = []
  for (let i = 0; i < amount; i++) {
    pacts.push({ key: i })
  }

  return (
    <>
      {amount != 0 ? (
        <SimpleGrid columns={5} spacing={10}>
          {pacts.map((pact) => (
            <ScrollPact key={pact.key} index={pact.key} address={address} />
          ))}
        </SimpleGrid>
      ) : (
        <AlertContainer>
          <DefaultAlert
            isOpen={amount === 0}
            status="warning"
            title="bridge a pact"
            description="You need to bridge a pact from filecoin"
          />
        </AlertContainer>
      )}
    </>
  )
}
