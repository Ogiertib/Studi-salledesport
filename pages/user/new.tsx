import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthenticatedLayout from '../../components/AuthenticatedLayout'

export default function New() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(true);
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
} = useForm();
const onSubmitHandler = async (data : any) => {
  if (!isLoading) {
      setIsLoading(true);
      const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });
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
};
console.log()
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
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              {isSended && (
               <p>
              Votre message a bien été envoyé avec
              succes.
              </p>
              )}
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
                  <label>Role
                      <select 
                         {...register('role', { required: true }) }
                        className="rounded-lg m-2 border-4 border border-gray-400">
                        <option value={1}>admin</option>
                        <option value={2}>client</option>
                        <option value={3}>franchise</option>
                      </select>
                  </label>
              </div>
              <div>
                  <label>Texte à envoyer 
                      <textarea 
                         {...register('text', { required: true }) }
                        placeholder=" Nous sommes heureux de vous compter parmi nous !
                          Pour valider votre compte veuillez vous connecter à l'adresse suivante : 
                          http://127.0.0.1:3333/Mdp
                          Votre email sera votre identifiant" 
                        className="h-60 m-2 w-100 rounded-lg m-2 border-4 border border-gray-400"> 
                      </textarea>
                  </label>
              </div>
              <input
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

