import PublicLayout from '../components/PublicLayout'
import { signIn } from 'next-auth/react'

export default function Index() {
 
  return (
    <PublicLayout pageTitle={'Accueil'}>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Salle de sports</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="h-96 rounded-lg font-bold justify-items-center border-4 border border-gray-200">
            <h1 className=' m-4 text-xl grid justify-items-center'>Bonjour et bienvenue. </h1>
            <p className=' grid justify-items-center'>Le site de gestion parfait de vos salles de sport.</p>
            <p className=' grid justify-items-center'>Veuillez-vous authentifier pour pouvoir accéder à la plateforme de gestion.</p>
            <div className=' grid m-4 justify-items-center'> 
              <button onClick={() => signIn()}className=" rounded-full bg-gray-800 m-2  p-1 text-gray-100 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 focus:ring-offset-gray-800"
              > Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
