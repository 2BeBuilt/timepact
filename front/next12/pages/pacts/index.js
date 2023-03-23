import GetPacts from '@/components/contracts/GetPacts'
import { useAccount } from 'wagmi'
import DefaultAlert from '@/components/Alerts/DefaultAlert'
import AlertContainer from '@/components/Alerts/AlertContainer'
import { chains } from '@/utils/constants/chains.json'
import { useNetwork } from 'wagmi'
import PageAlerts from '@/components/Alerts/PageAlerts'

export default function Pacts() {
  const { address, isConnected, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  return (
    <main>
      <PageAlerts chain={chain} isDisconnected={isDisconnected} />
      <GetPacts address={address} />
    </main>
  )
}
