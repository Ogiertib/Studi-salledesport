import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface PublicLayoutProps extends PropsWithChildren {
  pageTitle: string,
}

const PublicLayout = ({
  pageTitle,
  children
}: PublicLayoutProps) => {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'loading') {
    return <>Loading...</>
  }

  if (session.status === 'authenticated') {
    router.replace('/franchises')
  }

  console.log(session.status)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-1 items-center">
                    <Image
                      className="block h-8 w-auto lg:hidden invert"
                      src="/salledesport.png"
                      alt="SalleDeSport"
                      width={100}
                      height={1000}
                    />
                    <Image
                      className="hidden h-8 w-auto lg:block fill-white invert"
                      src="/salledesport.png"
                      alt="Your Company"
                      width={800}
                      height={800}
                    />
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center text-white pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <button onClick={() => signIn()}>Se connecter</button>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      <main>
        {children}
      </main>
    </>
  )
}

export default PublicLayout