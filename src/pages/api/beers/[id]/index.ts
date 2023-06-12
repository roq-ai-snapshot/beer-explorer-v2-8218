import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { beerValidationSchema } from 'validationSchema/beers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.beer
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBeerById();
    case 'PUT':
      return updateBeerById();
    case 'DELETE':
      return deleteBeerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBeerById() {
    const data = await prisma.beer.findFirst(convertQueryToPrismaUtil(req.query, 'beer'));
    return res.status(200).json(data);
  }

  async function updateBeerById() {
    await beerValidationSchema.validate(req.body);
    const data = await prisma.beer.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBeerById() {
    const data = await prisma.beer.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
