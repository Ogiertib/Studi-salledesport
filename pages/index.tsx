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
          <div className="h-96 rounded-lg border-4 border border-gray-200">
            <button onClick={() => signIn()}>Se connecter</button>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
