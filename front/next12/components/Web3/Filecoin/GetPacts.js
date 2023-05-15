import { SimpleGrid } from '@chakra-ui/react'
import { pact } from '@/utils/constants/addresses'
import { useBalanceOf } from '@/hooks/useBalanceOf'

import Pact from './Pact'
import DefaultAlert from '@/components/Alerts/DefaultAlert'
import AlertContainer from '@/components/Alerts/AlertContainer'
import abi from '@/utils/constants/abiTimePact.json'

export default function GetPacts({ address }) {
  const [amount] = useBalanceOf(address, pact, abi)
  const pacts = []
  for (let i = 0; i < amount; i++) {
    pacts.push({ key: i })
  }

  return (
    <>
      {amount != 0 ? (
        <SimpleGrid columns={{ md: '5', base: '1' }} spacing={10}>
          {pacts.map((pact) => (
            <Pact key={pact.key} index={pact.key} address={address} />
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
