import SignPact from '@/components/contracts/SignPact'
import { useAccount, useNetwork } from 'wagmi'
import PageAlerts from '@/components/Alerts/PageAlerts'

export default function Sign() {
  const { address, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const handleUpload = () => {
    console.log('Ok')
  }
  return (
    <main>
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
