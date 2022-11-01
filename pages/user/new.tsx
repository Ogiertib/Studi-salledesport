import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthenticatedLayout from '../../components/AuthenticatedLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export default function New() {
  interface IFormInputs {
    email: string
    password: string
    role: string
    name:string
  }

const schema = yup.object({
    name: yup.string().required('champs est requis').min(4, 'le nom doit contenir 6 caractères minimum'),
    email: yup.string().email().required('champs est requis'),
    password: yup.string().required("Vous devez choisir un mot de passe sécurisé"),
    role: yup.string().required('champs est requis')
  }).required();

  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      isSubmitting,
      errors
    }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

setValue('password','sport1234')

  const onSubmit = async (data : any) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await fetch('/api/users', {method: 'POST', body: JSON.stringify(data)})
      router.push('/')
    } catch(e) {
      console.log(e)
    }
  };

  return (
    <AuthenticatedLayout pageTitle={'Créer un utilisateur'}>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Créer un utilisateur</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="h-140 rounded-lg border-4 border border-gray-400">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <label>Name
                      <input  
                      {...register('name', { required: true }) }
                        type='text' 
                        className="rounded-lg m-2 border-4 border border-gray-400"/>
                  </label>
                  <p className='text-red-600'>{errors?.name?.message}</p>
              </div>
              <div>
                  <label>Email
                      <input 
                        {...register('email', { required: true }) }
                        type='email' 
                        className="rounded-lg m-2 border-4 border border-gray-400"/>
                  </label>
                  <p className='text-red-600'>{errors?.email?.message}</p>
              </div>
            
              <label> Role
              <select  {...register('role', { required: true }) }
                className="rounded-lg m-2 border-4 border border-gray-400">
                <option value="1">admin</option>
                <option value="2">client</option>
                <option value="3">franchise</option>
              </select>
              </label>
              <input
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                type="submit"
                value="Créer"
                className="rounded-full bg-gray-800 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              </input>
              <p className='text-red-600'>{errors?.role?.message}</p>
            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

