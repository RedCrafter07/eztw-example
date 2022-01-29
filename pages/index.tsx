import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'

type StreamerData = {
  broadcaster_language: string
  broadcaster_login: string
  display_name: string
  game_name: string
  game_id: string
  id: string
  is_live: boolean
  started_at: string
  tag_ids: Array<string>
  thumbnail_url: string
  title: string
}

export default function Home() {
  let [results, setResults] = useState(Array<StreamerData>())
  let [list, setList] = useState(Array<string>())
  let searchInput = useRef<HTMLInputElement>(null)

  let timeout: any

  function handleSearch(e: any) {
    if (e.target.value.length > 3) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fetch('/api/search', {
          headers: {
            streamer: e.target.value,
          },
        })
          .then((res) => res.json())
          .then((res) => setResults(res.streamers))
      }, 1000)
    } else {
      setResults([])
    }
  }

  function DisplayResults() {
    return (
      <div className="rounded-lg bg-slate-300 px-4">
        {results.length > 0
          ? results.map((streamer: StreamerData, index: number, array) => {
              return (
                <div
                  key={streamer.broadcaster_login}
                  className={`${
                    index + 1 == array.length ? '' : 'border-b'
                  } border-black border-opacity-25`}
                >
                  <ListItem name={streamer.display_name}></ListItem>
                </div>
              )
            })
          : ''}
      </div>
    )
  }

  function ListItem(props: { name: string }) {
    return (
      <a
        href={`/streamer/${props.name}`}
        className={`text-black`}
        onClick={handleClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        {props.name}
      </a>
    )

    function handleClick(e: any) {
      // e.preventDefault()
      if (searchInput && searchInput.current) searchInput.current.value = ''
      setResults([])
      let name = e.currentTarget.textContent
      if (!list.includes(name)) setList([...list, name])
    }
  }

  function List() {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {list.map((streamer: string, index: number, array) => {
          return (
            <div
              key={index}
              className="rounded-lg border-black border-opacity-25 bg-slate-200 px-4 py-2"
            >
              {streamer}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>EzTwitch-Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-slate-400 py-10 px-4 text-center text-white lg:px-20">
          <h1 className="text-6xl font-bold">
            Welcome to{' '}
            <a
              className="text-purple-600"
              href="https://github.com/Rediverse/EzTwitch"
            >
              EzTwitch
            </a>
            !
          </h1>
          <br></br>
          <form
            action="/"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              type="text"
              name="text"
              id=""
              className="w-full rounded-lg bg-slate-300 px-4 py-2 text-black focus:outline-none"
              placeholder="Username..."
              onChange={(e) => {
                e.target.value = e.target.value.replace(' ', '_').toLowerCase()
                handleSearch(e)
              }}
              ref={searchInput}
              autoComplete="off"
            />
          </form>
          <br />
          <DisplayResults></DisplayResults>
        </div>
        <div className="container mx-auto px-2">
          <h1 className="text-3xl">Deine Streamer</h1>
          <List></List>
        </div>
      </main>
    </div>
  )
}
