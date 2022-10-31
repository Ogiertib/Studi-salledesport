import { PlusIcon } from '@heroicons/react/24/outline'
import AuthenticatedLayout from '../../components/AuthenticatedLayout'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function New() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const[chooseClient, setChooseClient]= useState('')
  const onSubmit = async (data: any) => {
    await fetch('/api/franchises', {method: 'POST', body: JSON.stringify(data)})
   router.push('/franchises')
}
  const { data : user } = useQuery(
    'users',
    async () => {
      const res = await fetch(`/api/users`)
      return await res.json()
    }
  )
  const { data : client } = useQuery(
    'clients',
    async () => {
      const res = await fetch(`/api/clients`)
      return await res.json()
    }
  )
  return (
    <AuthenticatedLayout pageTitle={'Créer une franchise'}>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Créer une franchise</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="h-96 rounded-lg m-2 border-4 border border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <label>Name
                      <input {...register('name')} className="rounded-lg m-2 border-4 border border-gray-400"/>
                  </label>
              </div>
              <div>
                  <label>Adresse
                      <input {...register('address')} className="rounded-lg m-2 border-4 border border-gray-400"/>
                  </label>
              </div>
              <div>
              <label>Active
                  <input
                      id='active'
                      {...register('active')}
                      name="active"
                      type="checkbox"
                      className="rounded-lg border-4 m-2 border border-gray-400">
                  </input>
              </label>
              </div>
              <div>
              <label>Contact
                <select {...register('userId')}
                  name="userId"
                  className="rounded-lg m-2 border-4 border border-gray-400"
                >
                   {user && user.map((users: any) => (
                         <option  key={users.id} value={users.id}>{users.name} {users.email}</option>))}
                </select>
              </label>
             
              <a href={`/user/new`}>
                Ajouter un contact
                <button
                  type="button"
                  className="rounded-full bg-green-700 m-2 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <PlusIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </a>
              </div>
              <label>La franchises appartient au client :
                <select {...register('clientId')}
                  name="clientId"
                  className="rounded-lg m-2 border-4 border border-gray-400"
                >{client && client.map((client: any) => (
                         <option  value={client.id} key={client.id}> {client.name} </option>))}
                </select>
              </label>
              <div>
              </div>
              <button
                  onClick={handleSubmit(onSubmit)}
                  className="rounded-full m-2 bg-gray-800 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >créer
              </button>
              <a href="/franchises" className='rounded-full bg-gray-800 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                 Annuler
              </a>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}