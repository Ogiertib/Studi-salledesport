import Head from 'next/head'
import Header from '../../../components/Header'
import { ArrowRightIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function Client() {
 const router = useRouter()
 const id = router.query.id

  const { data } = useQuery(
    ['franchises', id],
    async () => {
      const res = await fetch(`/api/franchises/${id}`)
      return await res.json()
    }
  )

  console.log(data)
  return (
    <div>
      <Head>
        <title>Franchise</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <Header/>
      <main>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Franchise {data?.name} </h1>
            
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {<div>
                <a href={`/franchises/${data?.id}/edit`}>
                    <button
                        type="button"
                        className="rounded-full bg-green-700 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                        Modifier
                    </button>
                </a>
            </div>}
          <div className="px-4 py-6 sm:px-0">
            
            <div className="h-96 rounded-lg border-4 border border-gray-400">
              <p>Nom de la franchise :<strong>{data?.name}</strong></p>
              <p>La franchise est : <strong>{data?.active ? 'Active' : 'Désactivé'}</strong></p>
              <p>Adresse de la franchise :<strong>{data?.address}</strong></p>
              <p>Contact : <strong> {data?.user.email}</strong></p>
              <p>La franchise appartient au client :<strong>{data?.client.name}</strong></p>
              <p>La franchise peut : <strong>
                {data?.drink?'Vendre des boissons': ''} {data?.planning ? 'Gérer les plannings' : ''} {data?.newsletter ? 'gérer les newsletter': ''}
                </strong>
                </p>
            </div>
          </div>
          {}
        </div>
      </main>

    </div>
  )
}
