import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'email',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "johndoe@test.fr" },
        password: {  label: "Mot de passe", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || user.password !== credentials.password) {
          return null
        }

        return user
      }
    })
  ],
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  }
})