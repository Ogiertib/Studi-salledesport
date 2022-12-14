import Head from 'next/head'
import Header from '../../components/Header';
import { PlusIcon} from '@heroicons/react/24/outline'
import Modal from "react-modal";
import React, { Component, FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


export default function New() {
  interface IFormInputs {
    name: string
    address: string
    active: boolean
    newsletter: boolean
    drink: boolean
    planning: boolean
    userId: string
  }
  const schema = yup.object({
    name: yup.string().required('Le nom est requis'),
    address: yup.string().required('Le siège social est requis'),
    active: yup.boolean(),
    planning: yup.boolean(),
    newsletter: yup.boolean(),
    drink: yup.boolean(),
    userId: yup.string().required('La franchise doit appartenir à un utilisateur'),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  })
  const router = useRouter()

  const onSubmit = async (data : any) => {
      await fetch('/api/clients', {method: 'POST', body: JSON.stringify(data)})
      router.push('/clients')
    }

  const { data } = useQuery(
    'clients',
    async () => {
      const res = await fetch(`/api/users`)
      return await res.json()
    }
  )
 
  return (
    <AuthenticatedLayout pageTitle={'Franchises'}>
    <div>
      <main>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Client</h1>
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          { <div>
                <div>Creation d'un client</div>
            </div>
          }
          <div className="px-4 py-6 sm:px-0">
            
            <div className="h-96 w-200 rounded-lg border-4 border border-gray-400">
              <form onSubmit={handleSubmit(onSubmit)} method='POST' >
                <div>
                    <label>Nom du client
                        <input {...register('name')} name="name"className="rounded-lg m-2 border-4 border border-gray-400"></input>
                        <p className='text-red-600'>{errors?.name?.message}</p>
                    </label>
                </div>
                <div>
                    <label>Siège sociale
                        <input {...register('address')} name="address" className="rounded-lg w-200 m-2 w-900 border-4 border border-gray-400"></input>
                        <p className='text-red-600'>{errors?.address?.message}</p>
                    </label>
                </div>
                <div>
                <label>Gérer les plannings 
                    <input  
                        id="planning"
                        type="checkbox" 
                        className="rounded-lg m-2 border-4 border border-gray-400"
                        {...register('planning')}>
                    </input>
                </label>
                <label>Gérer les boissons
                    <input 
                        id="drink"
                        {...register('drink')}
                        type="checkbox" 
                        className="rounded-lg m-2 border-4 border border-gray-400">
                    </input>
                </label>
                <label>Création newsletter
                    <input 
                        id='newsletter'
                        {...register('newsletter')}
                        name="newsletter" 
                        type="checkbox" 
                        className="rounded-lg m-2 border-4 border border-gray-400">
                    </input>
                </label>
                </div>
                <div>
                <label>Contact
                    <select
                        {...register('userId')}
                        name="userId" 
                        className="rounded-lg m-2 border-4 border border-gray-400"
                        >
                        {data?.filter((item :any)=>{
                return item?.role.includes(2)            
                    }).map((item : any) => (
                         <option  key={item.id} value={item.id} >{item.email}</option>))}
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
              <p className='text-red-600'>{errors?.userId?.message}</p>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="rounded-full m-2 bg-gray-800 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >créer
              </button>
              <a href="/clients" className='rounded-full bg-gray-800 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                 Annuler
              </a>
              </form>
            </div>
          </div>
          {}
        </div>
      </main>

    </div>
  </AuthenticatedLayout>
  )
}
