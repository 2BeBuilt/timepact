'use client'

import { useState } from 'react'
import { FileInput, Label, Modal, Button } from 'flowbite-react'

export default function UploadModal({ handleClick }) {
  const [visible, setVisible] = useState(false)
  const [file, selectFile] = useState(null)
  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files)
    selectFile(files[0])
  }
  const onClose = () => {
    selectFile(null)
    document.getElementById('file').value = ''

    setVisible(false)
  }
  return (
    <>
      <Button onClick={() => setVisible(true)}>Upload</Button>
      <Modal show={visible} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              onChange={handleFileSelected}
              id="file"
              helperText="File selected"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!file}
            onClick={() => {
              onClose()
              handleClick(file)
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
