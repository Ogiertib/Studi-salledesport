import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      const franchises = await prisma.franchise.findMany({include : {user: true, client : true}})
      res.status(200).json(franchises)
      break
    case 'POST':
      const body = JSON.parse(req.body)
      const client = await prisma.client.findUnique({ where: {id: body.clientId}})
      const franchise = await prisma.franchise.create({
        data: { ...body,
           drink : client?.drink,
           planning : client?.planning,
           newsletter : client?.newsletter
        },
      })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}