export default function convertToGateway(url) {
  return url.replace('ipfs://', 'https://ipfs.io/ipfs/')
}
