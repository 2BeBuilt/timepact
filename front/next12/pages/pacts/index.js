import GetPacts from '@/components/contracts/GetPacts'
import { useAccount } from 'wagmi'
import { useNetwork } from 'wagmi'
import PageAlerts from '@/components/Alerts/PageAlerts'
import PageHead from '@/components/PageHead'
import GetScrollPacts from '@/components/contracts/Scroll/GetScrollPacts'

export default function Pacts() {
  const { address, isConnected, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  return (
    <main>
      <PageHead title="My Pacts" />
      <PageAlerts chain={chain} isDisconnected={isDisconnected} />
      {chain && chain.id === 3141 ? (
        <GetPacts address={address} />
      ) : (
        chain && chain.id === 534353 && <GetScrollPacts address={address} />
      )}
    </main>
  )
}
