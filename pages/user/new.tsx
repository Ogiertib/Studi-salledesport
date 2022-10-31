import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthenticatedLayout from '../../components/AuthenticatedLayout'

export default function New() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
} = useForm();
const onSubmit = async (data : any) => {
  if (!isLoading) {
      setIsLoading(true);
      const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });
      await fetch('/api/users', {method: 'POST', body: JSON.stringify(data)})
      router.push('/')
      const result = await response.json();
      setIsLoading(false);
      if (!response.ok) {
          console.log("error");
      } else {
          console.log("ok");
          reset();
          setIsSended(true);
      }
  }
  console.log(data)
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
              </div>
              <div>
                  <label>Email
                      <input 
                        {...register('email', { required: true }) }
                        type='email' 
                        className="rounded-lg m-2 border-4 border border-gray-400"/>
                  </label>
              </div>
              <div>
                      <input 
                        
                        type='password' 
                        className="rounded-lg m-2 border-4 border border-gray-400"
                        value="monpremiermotdepasse"/>  
              </div>
              <label> Role
              <select 
                className="rounded-lg m-2 border-4 border border-gray-400">
                <option value="1">admin</option>
                <option value="2">client</option>
                <option value="3">franchise</option>
              </select>
              </label>
             
              <input
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  value="Créer"
                  className="rounded-full bg-gray-800 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              </input>
            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

