import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { id }, method } = req

  if (!id) {
    return res.status(406).end(`Bad request`)
  }

  switch (method) {
    case 'GET':
      const franchise = await prisma.franchise.findUnique({where: {id: id as string}})
      res.status(200).json(franchise)
      break
    case 'PUT':
      const updatedFranchise = await prisma.franchise.update({
        where: {id: id as string},
        data: JSON.parse(req.body)
      })
      res.status(200).json(updatedFranchise)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}