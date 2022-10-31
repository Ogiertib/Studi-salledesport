import Head from 'next/head'
import Header from '../../components/Header';
import { PlusIcon} from '@heroicons/react/24/outline'
import Modal from "react-modal";
import React, { Component, FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';



export default function New() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const onSubmit = async (data: any) => {
        await fetch('/api/clients', {method: 'POST', body: JSON.stringify(data)})
         router.push('/clients/')
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
                    </label>
                </div>
                <div>
                    <label>Siège sociale
                        <input {...register('address')} name="address" className="rounded-lg w-200 m-2 w-900 border-4 border border-gray-400"></input>
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
                       {data && data.map((user: any) => (
                         <option  key={user.id} value={user.id} >{user.email}</option>))}
                    </select>
                </label>
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
