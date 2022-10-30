import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      const clients = await prisma.client.findMany({include : {user: true, franchises : true}})
      res.status(200).json(clients)
      break
    case 'POST':
      const client = await prisma.client.create({
        data: JSON.parse(req.body),
      })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}