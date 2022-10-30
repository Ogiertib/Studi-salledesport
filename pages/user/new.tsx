import AuthenticatedLayout from '../../components/AuthenticatedLayout'

export default function New() {
  return (
    <AuthenticatedLayout pageTitle={'Créer un utilisateur'}>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Créer un utilisateur</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="h-96 rounded-lg border-4 border border-gray-200">
            <form>

            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

