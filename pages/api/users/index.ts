import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  
  
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
      case 'PUT':
        const body = JSON.parse(req.body)
        const getUser = await prisma.user.findFirst({ where: { AND: 
            [{email: body.email as string}, 
           { password: body.token as string}
          ]}
          }, 
        )
        const updatedUser = await prisma.user.update({
          where: {id : getUser?.id as string},
          data:{
            password: body.password,
            role: getUser?.role,
            name: getUser?.name,
            email: getUser?.email
          }
        })
        res.status(200).json(updatedUser)
        break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}