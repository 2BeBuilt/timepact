import { useAccount } from 'wagmi'
import { useNetwork } from 'wagmi'

import PageAlerts from '@/components/Alerts/PageAlerts'
import PageHead from '@/components/Common/PageHead'
import GetPacts from '@/components/Web3/Filecoin/GetPacts'
import GetScrollPacts from '@/components/Web3/Scroll/GetScrollPacts'
import Page from '@/components/Common/Page'

export default function Pacts() {
  const { address, isConnected, isDisconnected } = useAccount()
  const { chain } = useNetwork()

  return (
    <Page>
      <PageHead title="My Pacts" />
      <PageAlerts chain={chain} isDisconnected={isDisconnected} />
      {chain && chain.id === 3141 ? (
        <GetPacts address={address} />
      ) : (
        chain && chain.id === 534353 && <GetScrollPacts address={address} />
      )}
    </Page>
  )
}
