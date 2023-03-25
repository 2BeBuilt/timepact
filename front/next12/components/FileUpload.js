import {
  AspectRatio,
  Box,
  forwardRef,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'

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

export default function FileUpload({ handleFilesSelected }) {
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
                <PreviewImage variants={first} backgroundImage="/frag2.png" />
                <PreviewImage variants={second} backgroundImage="/frag1.png" />
                <PreviewImage
                  variants={third}
                  backgroundImage="/frag_main.png"
                />
              </Box>
              <Stack p="1" textAlign="center" spacing="1">
                <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                  Drop file here
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
          />
        </Box>
      </Box>
    </AspectRatio>
  )
}
