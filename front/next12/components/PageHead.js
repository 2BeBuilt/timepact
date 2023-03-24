import Head from 'next/head'

export default function PageHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        property="og:title"
        content="Encrypt and save your data for the future!"
        key="title"
      />
    </Head>
  )
}
