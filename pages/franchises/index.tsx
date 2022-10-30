import { PlusIcon, ArrowRightIcon} from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import AuthenticatedLayout from '../../components/AuthenticatedLayout'
import { useQuery } from 'react-query'

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("")
  const [checked, setChecked]= useState(false)
  const handleChange = () => setChecked(checked => !checked)

  const { data } = useQuery(
    'franchises',
    async () => {
      const res = await fetch('/api/franchises')
      return await res.json()
    }
  )

  return (
    <AuthenticatedLayout pageTitle={'Franchises'}>
      <header className="bg-white shadow">
        <div className="mx-auto m-2 max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Franchises</h1>
        </div>
      </header>

        <div className="mx-auto m-2 max-w-7xl py-4 sm:px-6 lg:px-8">
          <div>
            <div className='grid grid-cols-4'>
            <input
              className="rounded-lg m-2 border-4 border border-gray-400"
              type="text"
              name="searchBar"
              id="searchBar"
              value={searchTerm}
              placeholder='Rechercher'
              onChange={(e) => {setSearchTerm(e.target.value)}}
            />
            <label className='col-span-1  m-2'>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
              Franchise Active
            </label>
            <a href="franchises/new" className='col-end-5'> Ajouter une franchise
                <button
                  type="button"
                  className=" rounded-full m-2 bg-green-700 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </a>
                
            </div>
         </div>
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border border-gray-200">
              {data && data.map((franchise: any) => (
                <div key={franchise.id}>
                  <p>Nom : {franchise.name}</p>
                </div>
              ))}
              <div>
                <div> Montrer la Franchise</div>
                <a href="pages/franchise/[id]/index.tsx">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </a>
            </div>
            </div>
          </div>
        </div>
    </AuthenticatedLayout>
  )
}