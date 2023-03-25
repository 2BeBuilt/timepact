import SignPact from '@/components/contracts/SignPact'
import { useAccount, useNetwork } from 'wagmi'
import PageAlerts from '@/components/Alerts/PageAlerts'
import PageHead from '@/components/PageHead'
import Countdown from 'react-countdown'

export default function Sign() {
  const { address, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  return (
    <main>
      <PageHead title="Signing pact" />
      {/*TODO wrong chain handler*/}
      {!isDisconnected && (
        <>
          <SignPact address={address} />
        </>
      )}
      <PageAlerts chain={chain} isDisconnected={isDisconnected} />
    </main>
  )
}
