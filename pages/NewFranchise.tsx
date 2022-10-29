import Head from 'next/head'
import Header from '../components/Header'
import { PlusIcon} from '@heroicons/react/24/outline'

export default function NewFranchise() {
 const onSubmit =(d :any)=> alert(JSON.stringify(d))
  return (
    <div>
      <Head>
        <title>Franchise</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Franchise</h1>
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {<div>
                <div>Creation d'une franchise</div>
                
            </div>
          }
          <div className="px-4 py-6 sm:px-0">
            
            <div className="h-96 rounded-lg m-2 border-4 border border-gray-200">
              <form onSubmit={onSubmit}>
                <div>
                    <label>Name
                        <input name="name"className="rounded-lg m-2 border-4 border border-gray-400"></input>
                    </label>
                </div>
                <div>
                    <label>Adresse
                        <input name="address" className="rounded-lg m-2 border-4 border border-gray-400"></input>
                    </label>
                </div>
                <div>
                <label>Active
                    <input 
                        name="address" 
                        type="checkbox" 
                        className="rounded-lg border-4 m-2 border border-gray-400">
                    </input>
                </label>
                </div>
                <div>
                <label>Contact
                    <select
                        name="userId" 
                        className="rounded-lg m-2 border-4 border border-gray-400"
                        >
                        <option value="">Selection d'un utilisateur</option>
                        <option value="">George</option>
                        <option value="">John</option>
                    </select>
                </label>
                <a href="NewUser">Ajouter un contact
                    <button
                        type="button"
                        
                        className="rounded-full bg-green-700 m-2 p-1 text-neutral-50 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                        <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </a>
                </div>
                <div>
                <label>Client de la franchise
                    <select
                        name="ClientId" 
                        className="rounded-lg border-4 m-2 border border-gray-400"
                        >
                        <option value="">Selection d'un client</option>
                        <option value="">Salle muscu +</option>
                        <option value="">L'orange Bleu sport</option>
                    </select>
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
          {}
        </div>
      </main>

    </div>
  )
}