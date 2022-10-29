import Head from 'next/head'
import Header from '../components/Header'
import { ArrowRightIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'

export default function Client() {
 
  return (
    <div>
      <Head>
        <title>Franchise</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Franchise .name</h1>
            
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {<div>
                <a href="UpdateFranchise"> 
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
              <p>Nom de la franchise</p>
              <p>la franchise est : active/désactive</p>
              <p>adresse de la franchise</p>
              <p>Contact</p>
              <p>la franchise appartient au client</p>
              <p>la franchise peut : </p>
              
            </div>
            
          </div>
          {}
        </div>
      </main>

    </div>
  )
}
