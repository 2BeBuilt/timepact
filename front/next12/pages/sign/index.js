import SignPact from '@/components/contracts/SignPact'
import { useAccount, useNetwork } from 'wagmi'
import PageAlerts from '@/components/Alerts/PageAlerts'
import PageHead from '@/components/Common/PageHead'
import AlertContainer from '@/components/Alerts/AlertContainer'
import DefaultAlert from '@/components/Alerts/DefaultAlert'
import { Center, Flex } from '@chakra-ui/react'
import Page from '@/components/Common/Page'

export default function Sign() {
  const { address, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  return (
    <Page>
      <PageHead title="Signing pact" />
      {!isDisconnected &&
        (chain && chain.id === 3141 ? (
          <>
            <SignPact address={address} />
          </>
        ) : (
          <AlertContainer>
            <Flex marginTop={2} />
            <DefaultAlert
              isOpen={true}
              status="warning"
              title="Switch to filecoin"
              description="Pacts signing are supported only on filecoin right now"
            />
          </AlertContainer>
        ))}
      <PageAlerts chain={chain} isDisconnected={isDisconnected} />
    </Page>
  )
}
