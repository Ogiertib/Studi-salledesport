import Head from 'next/head'
import Header from '../../../components/Header'
import { ArrowRightIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import AuthenticatedLayout from '../../../components/AuthenticatedLayout'
import Loader from '../../../components/Loader'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export default function NewFranchise() {

  interface IFormInputs {
    name: string
    address: string
    active: boolean
    clientId: string
    userId: string
    planning: boolean
    drink: boolean
    newsletter: boolean
  }
  const router = useRouter()
  const id = router.query.id

  const schema = yup.object({
    name: yup.string().required('Le nom est requis'),
    address: yup.string().required("Champ à renseigner"),
    active: yup.boolean(),
    planning: yup.boolean(),
    newsletter: yup.boolean(),
    drink: yup.boolean(),
    clientId: yup.string().required('La franchise doit appartenir à un client'),
    userId: yup.string().required('La franchise doit appartenir à un utilisateur'),
  }).required();

  const { register, handleSubmit,formState: { errors } } = useForm<IFormInputs>({resolver: yupResolver(schema)})
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

   const { data: franchise} = useQuery(
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
  

  if(!franchise) return( 
    <Loader />
   )

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
          <div>
                <div>Modification d'une franchise</div>
            </div>
          <div className="px-4 py-6 sm:px-0">
            
            <div className="h-auto bg-gray-50 rounded-lg m-2 border-4 border border-gray-200">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nom
                        <input 
                          {...register('name')}
                          className="rounded-lg m-2 border-4 border border-gray-400"
                          defaultValue={franchise.name}
                        >
                        </input>
                    </label>
                    <p className='text-red-600'>{errors?.name?.message}</p>
                </div>
                <div>
                    <label>Adresse
                        <input 
                          {...register('address')}
                          className="rounded-lg m-2 border-4 border border-gray-400"
                          defaultValue={franchise.address}
                        >
                        </input>
                    </label>
                    <p className='text-red-600'>{errors?.address?.message}</p>
                </div>
                <div>
                <label>Active
                    <input 
                        {...register('active')}
                        name='active'
                        type="checkbox" 
                        className="rounded-lg border-4 m-2 border border-gray-400"
                        defaultChecked = {franchise.active}
                        >
                    </input>
                </label>
                <p className='text-red-600'>{errors?.active?.message}</p>
                </div>
                <div>
                  <label>Gérer les boissons
                      <input 
                          {...register('drink')}
                          name= 'drink'
                          type="checkbox" 
                          defaultChecked = {franchise.drink}
                          className="rounded-lg border-4 m-2 border border-gray-400">
                      </input>
                  </label>
                  <label>Gérer les newsletters
                      <input 
                          {...register('newsletter')}
                          type="checkbox" 
                          name='newsletter'
                          defaultChecked = {franchise.newsletter}
                          className="rounded-lg border-4 m-2 border border-gray-400">
                      </input>
                  </label>
                  <label>Gérer les plannings
                      <input 
                          {...register('planning')}
                          type="checkbox" 
                          defaultChecked = {franchise.planning}
                          className="rounded-lg border-4 m-2 border border-gray-400">
                      </input>
                  </label>
                </div>
                <div>
                <label>Contact
                    <select 
                        {...register('userId')}
                        className="rounded-lg m-2 border-4 border border-gray-400"
                        > <option selected={true} value={franchise.user.id}>{franchise.user.email}</option>
                      {user?.filter((item :any)=>{
                        return item.role.includes(3) 
                        }).map((item : any) => (
                          <option key={item.id} value={item.id}>{item.email}</option>
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
                <p className='text-red-600'>{errors?.userId?.message}</p>
                <div>
                <label>La franchises appartient au client :
                <select 
                  {...register('clientId')}
                  className="rounded-lg m-2 border-4 border border-gray-400"   
                > 
                  <option selected={true} value={franchise.client.id}> {franchise.client.name} </option>
                  {client?.filter((item :any)=>{
                return item.user.role.includes(2)            
                    }).map((item : any) => (
                         <option value={item.id} key={item.id}> {item.name} </option>))}
                </select>
              </label>
              <p className='text-red-600'>{errors?.clientId?.message}</p>
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
                   Etes vous sûr de vouloir modifier la franchise?
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
                   Etes vous sûr de vouloir supprimer la franchise?
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