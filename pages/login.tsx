import Head from 'next/head'
import Header from '../components/Header'

export default function Login() {
 const onSubmit =(d :any)=> alert(JSON.stringify(d))
  return (
    <div>
  
      <main>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Connexion</h1>
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {}
          <div className="px-9 py-6 sm:px-0">
            
            <div className="h-400 rounded-lg m-2 border border-gray-400">
              <form onSubmit={onSubmit}>
                <div>
                    <label>Email
                        <input name="email"className="rounded-lg m-2  border-4 border border-gray-400"></input>
                    </label>
                </div>
                <div>
                    <label>Mot de passe
                        <input type='password' name="email" className="rounded-lg m-2 border-4 border border-gray-400"></input>
                    </label>
                </div>
                <input 
                    type="submit" 
                    value="Se connnecter"  
                    className="rounded-full bg-gray-800 m-2  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
