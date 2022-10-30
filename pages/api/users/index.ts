import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const user = await prisma.user.create({
    data: {
     email: 'sport@salle.fr', 
     name: 'Martin',
     password: 'sport',
     role: 1
    },
  })
  switch (method) {
    case 'GET':
      const users = await prisma.user.findMany()
      res.status(200).json(users)
      break
    case 'POST':
      const user = await prisma.user.create({
        data: JSON.parse(req.body),
      })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}