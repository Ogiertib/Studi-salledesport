import Head from 'next/head'
import Header from '../../components/Header'
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import AuthenticatedLayout from '../../components/AuthenticatedLayout'
import { useSession } from 'next-auth/react'

export default function Index() {
  const session = useSession()
  const userData : any = session.data
  const { data } = useQuery(
    'clients',
    async () => {
      const res = await fetch('/api/clients')
      return await res.json()
    }
  )
  console.log(data)
  const [searchTerm, setSearchTerm]= useState("")
  return (
    <AuthenticatedLayout pageTitle={'Client'}>
    <div>
  
      <header className="bg-white shadow">
        <div className="mx-auto m-2 max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Clients</h1>
        </div>
      </header>

      <main>
     
        <div className="w-full  py-2 sm:px-6 lg:px-17">
          {<div className=''>
            <div className='flex justify-between'>
             <input     
                className="rounded-lg m-2 border-4 border border-gray-400"
                 type="text"
                 name="searchBar"
                 id="searchBar"
                 value={searchTerm}
                 placeholder='Rechercher'
                 onChange={(e) => {setSearchTerm(e.target.value)}}
             />
                {userData?.role == 1 &&
                <a href="/clients/new" className='col-end-30'> Ajouter un client
                    <button
                        type="button"
                        className="rounded-full m-2 bg-green-700 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                        <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </a>
                }
                </div>
            </div>}
          <div className="px-4 py-6 sm:px-0">
            <div className="h-auto rounded-lg border-4 border border-gray-300">          
              {data?.filter((item :any)=>{
                return item?.name.toUpperCase().includes(searchTerm.toUpperCase())
              }).map((item: any) => (
                <div>
                  <div className=" m-2 rounded-lg bg-gray-50 border-4 border border-gray-400 hover:text-gray-400">
                    <a href={`/clients/${item?.id}`} >
                      <div key={item?.id} >
                        <p>Nom : <strong>{item?.name}</strong></p>
                        <p>Adresse : {item?.address}</p>
                        <p>Contact : {item?.user?.email}</p>
                        <p>Le client peut : {item?.drink ? 'Vendre des boissons' : ''} {item?.planning ? 'Gérer les plannings' : ''} {item?.newsletter ? 'Gérer les newsletter': ''}
                      </p>
                      </div>
                    </a>
                </div>
              </div>
              ))}

            </div>
          </div>
          {}
        </div>
      </main>
    </div>
     </AuthenticatedLayout>
  )
}
