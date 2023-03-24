import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'
import axios from 'axios'

const first = {
  rest: {
    rotate: '-15deg',
    scale: 0.95,
    x: '-50%',
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    x: '-70%',
    scale: 1.1,
    rotate: '-20deg',
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
}

const second = {
  rest: {
    rotate: '15deg',
    scale: 0.95,
    x: '50%',
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    x: '70%',
    scale: 1.1,
    rotate: '20deg',
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
}

const third = {
  rest: {
    scale: 1.1,
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    scale: 1.3,
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
}

const PreviewImage = forwardRef((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundImage={`url("")`}
      {...props}
      ref={ref}
    />
  )
})

export default function FileUpload() {
  const [cid, setCid] = useState(null)
  const [files, selectFiles] = useState(null)
  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files)
    selectFiles(files)
    var formData = new FormData()
    for (let key in files) {
      formData.append('file' + key, files[key])
    }
    axios
      .post('/api/ipfs/upload', formData, {
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
  const controls = useAnimation()
  const startAnimation = () => controls.start('hover')
  const stopAnimation = () => controls.stop()
  return (
    <AspectRatio width="64" ratio={1}>
      <Box
        borderColor="gray.300"
        borderStyle="dashed"
        borderWidth="1px"
        rounded="md"
        shadow="sm"
        role="group"
        transition="all 150ms ease-in-out"
        _hover={{
          shadow: 'md',
        }}
        as={motion.div}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <Box position="relative" height="100%" width="100%">
          <Box
            position="absolute"
            top="0"
            left="0"
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
          >
            <Stack
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              justify="center"
              spacing="4"
            >
              <Box height="32" width="20" position="relative">
                <PreviewImage
                  variants={first}
                  backgroundImage="/paper_files.png"
                />
                <PreviewImage variants={second} backgroundImage="/folder.png" />
                <PreviewImage variants={third} backgroundImage="/archive.png" />
              </Box>
              <Stack p="1" textAlign="center" spacing="1">
                <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                  Drop files here
                </Heading>
                <Text fontWeight="light">or click to upload</Text>
              </Stack>
            </Stack>
          </Box>
          <Input
            type="file"
            id="files"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            onDragEnter={startAnimation}
            onDragLeave={stopAnimation}
            onChange={handleFilesSelected}
            multiple
          />
        </Box>
      </Box>
    </AspectRatio>
  )
}
