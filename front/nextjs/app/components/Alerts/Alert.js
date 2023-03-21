'use client'

import { useState } from 'react'
import { Modal, Button } from 'flowbite-react'

export default function Alert({ show, text, setAlert }) {
  return (
    <>
      <Modal
        show={show}
        size="md"
        popup={true}
        onClose={() => setVisible(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <Label>{text}</Label>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!cid}
            onClick={() => {
              setAlert(false)
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
