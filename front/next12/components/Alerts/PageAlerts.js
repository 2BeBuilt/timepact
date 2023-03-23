import DefaultAlert from '@/components/Alerts/DefaultAlert'
import AlertContainer from '@/components/Alerts/AlertContainer'
import { chains } from '@/utils/constants/chains.json'

export default function PageAlerts({ chain, isDisconnected }) {
  return (
    <>
      <AlertContainer>
        <DefaultAlert
          isOpen={isDisconnected}
          status="error"
          title="Error connecting wallet!"
          description={`Please reconnect your wallet`}
        />
        {!isDisconnected && chain && (
          <DefaultAlert
            isOpen={!chains.includes(chain.id)}
            status="error"
            title="Wrong chain!"
            description={`Please connect to the right chain`}
          />
        )}
      </AlertContainer>
    </>
  )
}
