import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, PropsWithChildren } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const navigation = [
  { name: 'Franchises', href: '/franchises', current: false },
  { name: 'Clients', href: '/clients', current: false },
]

interface AuthenticatedLayoutProps extends PropsWithChildren {
  pageTitle: string
}

const AuthenticatedLayout = ({
  pageTitle,
  children
}: AuthenticatedLayoutProps) => {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'loading') {
    return <>Loading...</>
  }

  if (session.status === 'unauthenticated') {
    router.replace('/')
  }

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
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={
                            clsx(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <a
                          type="button"
                          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2"
                        >
                          <UserIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/user" className={clsx('block px-4 py-2 text-sm text-gray-700')}>
                              Votre compte
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button onClick={() => signOut()} className={clsx('block px-4 py-2 text-sm text-gray-700')}>
                              Déconnexion
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={clsx(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        {children}
      </main>
    </>
  )
}

export default AuthenticatedLayout