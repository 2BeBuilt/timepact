'use client'

import { Modal, Button, Spinner } from 'flowbite-react'

export default function Alert({ show, onClose, onAbort }) {
  return (
    <>
      <Modal show={show} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col justify-center gap-4">
            <p>File is uploading</p>
            <Spinner
              className="m-2"
              aria-label="Extra large spinner"
              size="xl"
            />
            <Button color="failure" onClick={onAbort}>
              Cancel the upload
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
