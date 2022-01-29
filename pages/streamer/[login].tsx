import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type StreamerData = {
  id: any
  login: any
  display: any
  broadcasterType: any
  description: any
  profileImage: any
  offlineImage: any
  views: any
  viewers: any
  language: any
  createdAt: any
  startedAt: any
  tagIds: any
  title: any
  type: any
  game: any
  thumbnail: any
  streamId: any
}

let timesRendered = 0

export default function Streamer() {
  let router = useRouter()
  let streamerLogin = router.query.login
  if (!streamerLogin || typeof streamerLogin != 'string') return 'HELP'
  let [data, setData] = useState<StreamerData>()
  streamerLogin = streamerLogin.toLowerCase().replace(' ', '_')

  if (timesRendered < 3) {
    fetch('/api/info', {
      headers: { streamer: streamerLogin },
    })
      .then((res) => res.json())
      .then((res) => setData(res.data))
  }

  timesRendered++

  console.log(data)

  return (
    <div className="min-h-screen">
      <Head>
        <title>EzTwitch-Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-slate-400 py-10 px-4 text-center text-white lg:px-20">
          <h1 className="text-6xl font-bold">{streamerLogin.toUpperCase()}</h1>
          <br></br>
        </div>
        <div className="container mx-auto px-2 text-center">
          <br />
          <img
            src={data?.profileImage}
            alt="Profilbild"
            className="mx-auto rounded-full"
          />
          <h1 className="text-3xl">Seite von {data?.display}</h1>
          <br></br>
          <p className="text-xl">{data?.description}</p>
          <br></br>
          <br></br>
          <p>Aufrufe: {data?.views}</p>
          <p>Live: {data?.startedAt != undefined ? 'Ja' : 'Nein'}</p>
          {data?.startedAt != undefined ? (
            <div>
              <p>Streamtitel: {data?.title}</p>
              <p>Zuschauer: {data?.viewers}</p>
              <p>Spiel: {data?.game}</p>
              <p>
                Thumbnail:{' '}
                <img src={data?.thumbnail} alt="" className="rounded-xl" />
              </p>
            </div>
          ) : (
            <p>
              Offline Banner:{' '}
              <img src={data?.offlineImage} alt="" className="rounded-xl" />
            </p>
          )}
        </div>
        <br></br>
      </main>
    </div>
  )
}
