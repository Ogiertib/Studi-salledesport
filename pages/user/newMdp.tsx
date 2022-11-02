import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import AuthenticatedLayout from '../../components/AuthenticatedLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export default function NewMdp() {

    interface IFormInputs {
        email: string
        password: string
        passwordOk: string
        token:string
      }

    const schema = yup.object({
        email: yup.string().email().required('Champ requis'),
        token: yup.string().required('Champ requis').matches(/(sport1234)/),
        password: yup.string().required("Vous devez choisir un mot de passe sécurisé").min(6 , '6 caractères minimum'),
        passwordOk: yup.string().required().oneOf([yup.ref('password'), null ],'Les mots de passe doivent correspondre') 
      }).required();

  const router = useRouter()
  const {
    register,
    unregister,
    handleSubmit,
    formState: {
      isSubmitting, errors
    }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async (data : any) => {
    try {
      await fetch('/api/users', {method: 'PUT', body: JSON.stringify(data)})
    } catch(e) {
      return null
    }
    router.push('/')
  };
 
  return (
<>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Choisir un mot de passe</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 m-2 py-6 sm:px-0">
          <div className="h-auto bg-gray-50 m-2 rounded-lg border-4 border border-gray-400">
            <form onSubmit={handleSubmit(onSubmit)}>
           
              <div className='m-2'>
                  <label>Email
                      <input 
                        {...register('email', { required: true }) }
                        type='email' 
                        className="rounded-lg m-2 border-4 border border-gray-400"/>
                  </label>
                  <p className='text-red-600'>{errors?.email?.message}</p>
              </div>
              <div className='m-2'>
                  <label>Token 
                      <input 
                        {...register('token', { required: true }) }
                        type='text' 
                        className="rounded-lg m-2 border-4 border border-gray-400"/>
                  </label>
                  <p className='text-red-600'>{errors?.token?.message}</p>
              </div>
              <div className='m-2'>
                <label>Mot de passe
                    <input 
                        {...register('password', { required: true }) }
                        type='password' 
                        className="rounded-lg m-2 border-4 border border-gray-400"
                        placeholder='XXXX'
                        />  
                </label>
                <p className='text-red-600'>{errors?.password?.message}</p>
              </div>
              <div className='m-2'>
                <label>Confirmation
                    <input 
                        {...register('passwordOk') }
                        type='password' 
                        className="rounded-lg m-2 border-4 border border-gray-400"
                        placeholder='XXXX'
                        />  
                </label>
                <p className='text-red-600'>{errors?.passwordOk?.message}</p>
              </div>
              <input
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                type="submit"
                value="Créer votre mot de passe"
                className="rounded-full m-2 bg-gray-800 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              </input>
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

