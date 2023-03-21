'use client'

import { useState } from 'react'
import { TextInput, Label, Modal, Button } from 'flowbite-react'

export default function DownloadModal({ host }) {
  const [visible, setVisible] = useState(false)
  const [cid, setCid] = useState(null)
  const onCidChange = (e) => {
    setCid(e.target.value)
  }
  const onClose = () => {
    setCid(null)
    document.getElementById('cidInput').value = ''
    setVisible(false)
  }
  return (
    <>
      <Button onClick={() => setVisible(true)}>Download</Button>
      <Modal show={visible} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <p>Download file</p>
          <TextInput
            id="cidInput"
            placeholder="Enter CID"
            required={true}
            value={cid}
            onChange={onCidChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!cid}
            onClick={() => {
              onClose()
              window.open(`/api/ipfs/retrieve?cid=${cid}`, '_blank')
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
