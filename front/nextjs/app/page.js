'use client'

import axios from 'axios'

import { useAccount } from 'wagmi'
import { useState } from 'react'

import Loading from './components/Alerts/Loading'
import Alert from './components/Alerts/Alert'
import UploadModal from './components/Files/UploadModal'
import NoSsr from './components/NoSsr'
import DownloadModal from './components/Files/DownloadModal'

export default function Home({ host }) {
  const abortController = new AbortController()
  const [loading, setLoading] = useState(null)
  const [alert, setAlert] = useState(null)
  const [cid, setCid] = useState(null)
  const { account, isConnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })
  const uploadClick = (file) => {
    if (!file) return

    setLoading(true)

    var formData = new FormData()
    formData.append('data', file)
    axios
      .post('/api/ipfs/upload', formData, {
        signal: abortController.signal,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response)
        setCid(response.data.path)

        setLoading(false)
        setAlert(true)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {})
  }
  const handleAlertClose = () => {
    setAlert(false)
  }
  const handleLoadingClose = () => {
    setLoading(false)
  }
  const handleAbortLoading = () => {
    abortController.abort()
    setLoading(false)
    console.log('Upload aborted!')
  }
  return (
    <main>
      {isConnected && (
        <div className="flex flex-wrap gap-2 items-center m-2">
          <NoSsr>
            <UploadModal handleClick={uploadClick} />
            <DownloadModal host={host} />
            <Alert show={alert} text={cid} onClose={handleAlertClose} />
            <Loading
              show={loading}
              onClose={handleLoadingClose}
              onAbort={handleAbortLoading}
            />
          </NoSsr>
        </div>
      )}
    </main>
  )
}
