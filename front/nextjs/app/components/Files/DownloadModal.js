'use client'

import { useState } from 'react'
import { TextInput, Label, Modal, Button } from 'flowbite-react'

export default function DownloadModal({ host }) {
  const [visible, setVisible] = useState(false)
  const [cid, setCid] = useState(null)
  const onCidChange = (e) => {
    setCid(e.target.value)
  }
  return (
    <>
      <Button onClick={() => setVisible(true)}>Download</Button>
      <Modal
        show={visible}
        size="md"
        popup={true}
        onClose={() => setVisible(false)}
      >
        <Modal.Header />
        <Modal.Body>
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
              window.open(`/api/ipfs/retrieve?cid=${cid}`, '_blank')
              setVisible(false)
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
