'use client'

import axios from 'axios'
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
  useAccount,
} from 'wagmi'
import { Card, Button, Toast } from 'flowbite-react'
import { useState } from 'react'

import Alert from './components/Alerts/Alert'
import UploadModal from './components/Files/UploadModal'
import NoSsr from './components/NoSsr'
import DownloadModal from './components/Files/DownloadModal'

export default function Home({ host }) {
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
      .post('/api/ipfs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response)
        alert(response.data.path)
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
          <DownloadModal host={host} />
        </NoSsr>
      </div>
    </main>
  )
}
