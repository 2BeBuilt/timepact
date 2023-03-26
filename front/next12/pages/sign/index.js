import SignPact from '@/components/contracts/SignPact'
import { useAccount, useNetwork } from 'wagmi'
import PageAlerts from '@/components/Alerts/PageAlerts'
import PageHead from '@/components/PageHead'
import AlertContainer from '@/components/Alerts/AlertContainer'
import DefaultAlert from '@/components/Alerts/DefaultAlert'
import { Flex } from '@chakra-ui/react'

export default function Sign() {
  const { address, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  return (
    <main>
      <PageHead title="Signing pact" />
      {!isDisconnected &&
        (chain && chain.id === 3141 ? (
          <>
            <SignPact address={address} />
          </>
        ) : (
          <AlertContainer>
            <Flex marginTop={2}></Flex>
            <DefaultAlert
              isOpen={true}
              status="warning"
              title="Switch to filecoin"
              description="Pacts signing are supported only on filecoin right now"
            />
          </AlertContainer>
        ))}
      <PageAlerts chain={chain} isDisconnected={isDisconnected} />
    </main>
  )
}
