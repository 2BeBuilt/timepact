import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { pact } from '@/utils/constants/addresses'
import contractAbi from '@/utils/constants/abiTimePact.json'

export default function Sign() {
  const { data, isSuccess } = useContractRead({
    address: pact,
    abi: contractAbi,
    functionName: 'tBlockTime',
    args: [],
  })
  console.log(data)

  return <main></main>
}
