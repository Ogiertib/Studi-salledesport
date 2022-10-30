import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      const franchises = await prisma.franchise.findMany()
      res.status(200).json(franchises)
      break
    case 'POST':
      const franchise = await prisma.franchise.create({
        data: JSON.parse(req.body),
      })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}