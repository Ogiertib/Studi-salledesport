import Head from 'next/head'
import Header from '../../../components/Header'
import { ArrowRightIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import AuthenticatedLayout from '../../../components/AuthenticatedLayout'
import { useSession } from 'next-auth/react'

export default function Client() {
  const session = useSession()
  const userData : any = session.data
  const router = useRouter()
  const id = router.query.id

 const { data } = useQuery(
  ['clients', id],
  async () => {
    const res = await fetch(`/api/clients/${id}`)
    return await res.json()
  }
)


  return (
    <AuthenticatedLayout pageTitle={'Franchises'}>
    <div>
      
      <main>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{data?.name}</h1>
            
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {userData?.role == 1 && <div>
                    <a href={`/clients/${data?.id}/edit`} >
                        <button
                            type="button"
                            className="rounded-full bg-green-700 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                            Modifier
                        </button>
                    </a>
                </div>}
          <div className="px-4 py-6 sm:px-0">
            
            <div className="h-auto bg-gray-50 rounded-lg border-4 border border-gray-400">
              <p>Nom du client :<strong>{data?.name}</strong> </p>
              <p>Siège social : <strong>{data?.address}</strong></p>
              <p>Contact : <strong>{data?.user.email}</strong></p>
              <div>
                <p>Le client possède : </p> 
                  {data && data.franchises.map((franchise: any) => (
                    <p key={franchise.id}><strong>{franchise.name} {franchise.address} </strong>
                        <a 
                          href={`/franchises/${franchise?.id}`} 
                          className="rounded-full bg-green-700 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" 
                        >Voir
                        </a>
                    </p>
                         ))}
              </div>
              <p>Le client peut : <strong> {data?.drink ? 'Vendre des boissons' : ''} {data?.planning ? 'Gérer les plannings' : ''} {data?.newsletter ? 'Gérer les newsletter': ''}</strong></p>
            </div>
          </div>
          {}
        </div>
      </main>

    </div>
  </AuthenticatedLayout>
  )
}
