import { Button, Flex, Input, Spacer } from '@chakra-ui/react'

import { useState } from 'react'

export default function FileUpload({ onUpload }) {
  const [file, selectFile] = useState(null)
  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files)
    selectFile(files[0])
  }
  return (
    <>
      <Input
        variant="unstyled"
        placeholder="Select file for upload"
        size="md"
        type="file"
        width="50"
        onChange={handleFileSelected}
      />
      <Button size="sm" onClick={onUpload}>
        Upload
      </Button>
    </>
  )
}
