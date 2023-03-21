'use client'

import { Modal, Button, Label } from 'flowbite-react'

export default function Alert({ show, text, onClose }) {
  return (
    <>
      <Modal show={show} popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex-col justify-center gap-4">
            <p>File uploaded</p>
            <p className="font-bold">CID: {text}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
