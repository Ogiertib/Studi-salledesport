import Head from 'next/head'
import Header from '../../../components/Header'
import { ArrowRightIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import AuthenticatedLayout from '../../../components/AuthenticatedLayout'

export default function NewFranchise() {
  const router = useRouter()
  const id = router.query.id
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data: any) => {
    await fetch(`/api/franchises/${id}`, {method: 'PUT', body: JSON.stringify(data)})
    router.push(`/franchises/${id}`)
  }
  const onDelete = async (data: any) => {
    await fetch(`/api/franchises/${id}`, {method: 'DELETE', body: JSON.stringify(data)})
    router.push(`/franchises/`)
  }
  let [isOpenUpdate, setIsOpenUpdate] = useState(false)
  function openUpdateModal() {
    setIsOpenUpdate(true)
  }
  function closeUpdateModal() {
    setIsOpenUpdate(false)
  }
  let [isOpen, setIsOpen] = useState(false)
  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

   const { data } = useQuery(
     ['franchises', id],
     async () => {
       const res = await fetch(`/api/franchises/${id}`)
       return await res.json()
     }
   )
   const { data : client } = useQuery(
    ['clients', id],
    async () => {
      const res = await fetch(`/api/clients`)
      return await res.json()
    }
  )
  const { data : user } = useQuery(
    ['users', id],
    async () => {
      const res = await fetch(`/api/users`)
      return await res.json()
    }
  )
console.log(data)


  return (
    <AuthenticatedLayout pageTitle={'Franchises'}>
    <div>
    
      <main>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Franchise</h1>
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {<div>
                <div>Modification d'une franchise</div>
                
            </div>
          }
          <div className="px-4 py-6 sm:px-0">
            
            <div className="h-96 rounded-lg m-2 border-4 border border-gray-200">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name
                        <input 
                          {...register('name')}
                          className="rounded-lg m-2 border-4 border border-gray-400"
                          defaultValue={data?.name}
                          id={data?.name}
                        >
                        </input>
                    </label>
                </div>
                <div>
                    <label>Adresse
                        <input 
                          {...register('address')}
                          className="rounded-lg m-2 border-4 border border-gray-400"
                          defaultValue={data?.address}
                        >
                        </input>
                    </label>
                </div>
                <div>
                <label>Active
                    <input 
                        {...register('active')}
                        id='active'
                        type="checkbox" 
                        className="rounded-lg border-4 m-2 border border-gray-400"
                        defaultChecked = {data?.active}
                        >
                    </input>
                </label>
                </div>
                <div>
                  <label>Gérer les boissons
                      <input 
                          {...register('drink')}
                          type="checkbox" 
                          defaultChecked = {data?.drink}
                          className="rounded-lg border-4 m-2 border border-gray-400">
                      </input>
                  </label>
                  <label>Gérer les newsletters
                      <input 
                          {...register('newsletter')}
                          type="checkbox" 
                          defaultChecked = {data?.newsletter}
                          className="rounded-lg border-4 m-2 border border-gray-400">
                      </input>
                  </label>
                  <label>Gérer les plannings
                      <input 
                          {...register('planning')}
                          type="checkbox" 
                          defaultChecked = {data?.planning}
                          className="rounded-lg border-4 m-2 border border-gray-400">
                      </input>
                  </label>
                </div>
                <div>
                <label>Contact
                    <select 
                        {...register('userId')}
                        className="rounded-lg m-2 border-4 border border-gray-400"
                        > <option selected={true} value={data?.user.id}>{data?.user.email}</option>
                          {user && user.map((users: any) => (
                          <option key={users.id} value={users.id}>{users.email}</option>
              ))}
                    </select>
                </label>
                <a href={`/user/new`}>Ajouter un contact
                    <button
                        type="button"
                        className="rounded-full bg-green-700 m-2 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                        <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </a>
                </div>
                <div>
                <label>La franchises appartient au client :
                <select 
                  {...register('clientId')}
                  className="rounded-lg m-2 border-4 border border-gray-400"   
                > 
                  <option selected={true} value={data?.client.id}> {data?.client.name} </option>
                  {client && client.map((client: any) => (
                         <option value={client.id} key={client.id}> {client.name} </option>))}
                </select>
              </label>
                
                </div>
                <button
                    onClick={openUpdateModal}
                    type="button" 
                    className="rounded-full bg-gray-800 p-1 m-2 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                    Modifier
                </button>
                <Transition appear show={isOpenUpdate} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeUpdateModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   Etes vous sur de vouloir modifier la franchise?
                  </Dialog.Title>
                  <div className="mt-2">
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-white-200 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2"
                      onClick={handleSubmit(onSubmit)}
                    >
                     Valider
                    </button>
                    <button
                      type="button"
                      className="inline-flex m-2 justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white-200 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-2"
                      onClick={closeUpdateModal}
                    >
                     Annuler
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
              </form>
              <div>
                    <button
                        onClick={openModal}
                        type="button"
                        className="rounded-full bg-red-600 p-1 m-2 text-neutral-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                        Supprimer
                    </button>
                
            </div>
           
            </div>
          </div>
          {} <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   Etes vous sur de vouloir supprimer la franchise?
                  </Dialog.Title>
                  <div className="mt-2">
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-white-200 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2"
                      onClick={handleSubmit(onDelete)}
                    >
                     Valider
                    </button>
                    <button
                      type="button"
                      className="inline-flex m-2 justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white-200 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                     Annuler
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
     
        </div>
      </main>

    </div>
  </AuthenticatedLayout>
  )
}