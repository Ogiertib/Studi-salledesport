import { PlusIcon, ArrowRightIcon} from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import AuthenticatedLayout from '../../components/AuthenticatedLayout'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("")
  const [checked, setChecked]= useState(false)
  const handleChange = () => setChecked(checked => !checked)
  const session = useSession()
  const userData : any = session.data

  const { register, handleSubmit } = useForm()

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

        <div className="mx-auto m-2  content-center max-w-7xl py-4 sm:px-6 lg:px-8">
          <div>
            <div className='grid  grid-cols-4'>
            <input
              className="rounded-lg  m-2 border-4 border border-gray-400"
              type="text"
              name="searchBar"
              id="searchBar"
              value={searchTerm}
              placeholder='Rechercher'
              onChange={(e) => {setSearchTerm(e.target.value)}}
            />
            <div>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
             <label className='col-span-1  m-2'>Franchise active</label>
            </div>
            {userData?.role == 1 && 
              <a href="franchises/new" className='col-end-5'> Ajouter une franchise
                  <button
                    type="button"
                    className=" rounded-full m-2 bg-green-700 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <PlusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
              </a>
                }
            </div>
         </div>
         <div className="h-auto rounded-lg border-4 border border-gray-300">
            {data?.filter((item :any)=>{
                return item.name.toUpperCase().includes(searchTerm.toUpperCase()) 
                && checked ? item.active : item.name.toUpperCase().includes(searchTerm.toUpperCase()) 
            }).map((item : any) => (
             <div className=" m-2 rounded-lg bg-gray-50 border-4 border border-gray-400 hover:text-gray-400">
               <a href={`/franchises/${item.id}`} >
                <div key={item.id} >
                  <p>Nom : <strong>{item?.name}</strong></p>
                  <p>La franchise est : {item.active ? "Active" : "Désactive"}</p>
                  <p>Contact : {item?.user.email}</p>
                  <p>Le client peut : {item.drink ? 'Vendre des boissons' : ''} {item.planning ? 'Gérer les plannings' : ''} {item.newsletter ? 'Gérer les newsletters': ''}
                </p>
                </div>
              </a>
              </div>
            ))}
            
           
          </div>
          </div>
       
    </AuthenticatedLayout>
  )
}