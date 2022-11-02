import AuthenticatedLayout from '../../components/AuthenticatedLayout'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

export default  function Index() {
  const router = useRouter()
  const id = router.query.id
  const session = useSession()
  const data : any = session.data
  console.log(session)
  return (
    <AuthenticatedLayout pageTitle={'Mon compte'}>

        <header className="bg-white shadow"> 
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Votre Compte</h1>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border border-gray-200">
             <p className="text-xl grid">Nom : {data?.name} </p>
              <p className=" text-xl grid ">Email : {data?.email}</p>
              <p className="text-xl grid">rôle : {data?.role}</p>
            </div>
          </div>
        </div>

    </AuthenticatedLayout>
  )
}
