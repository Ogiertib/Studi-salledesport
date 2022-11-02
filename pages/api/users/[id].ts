import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { id }, method } = req

  if (!id) {
    return res.status(406).end(`Bad request`)
  }
  switch (method) {
    case 'GET':
      const user = await prisma.user.findUnique({where: {id: id as string}})
      res.status(200).json(user)
      break
    case 'PUT':
      const updatedUser = await prisma.user.update({
        where: {id: id as string},
        data: JSON.parse(req.body)
      })
      res.status(200).json(updatedUser)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}