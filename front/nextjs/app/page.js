'use client'

import axios from 'axios'
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
  useAccount,
} from 'wagmi'
import { Card, Button, Image } from 'flowbite-react'
import { useState } from 'react'
import UploadModal from './components/Files/UploadModal'
import NoSsr from './components/NoSsr'
import DownloadModal from './components/Files/DownloadModal'
import JsFileDownloader from 'js-file-downloader'

export default function Home() {
  const [source, setSource] = useState(null)
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })
  const uploadClick = (file) => {
    if (!file) return

    var formData = new FormData()
    formData.append('data', file)
    axios
      .post(`http://localhost:3010/api/ipfs/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {})
  }
  return (
    <main>
      <div className="flex flex-wrap gap-2 items-center m-2">
        <NoSsr>
          <UploadModal handleClick={uploadClick} />
          <DownloadModal />
        </NoSsr>
      </div>
    </main>
  )
}
