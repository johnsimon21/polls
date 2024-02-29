import z from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getPoll(app: FastifyInstance) {

    app.get('/polls/:pollId', async (request, reply) => {
        const createPollBody = z.object({
            pollId: z.string().uuid()
        })

        const { pollId } = createPollBody.parse(request.params)

        const poll = await prisma.poll.findUnique({
            where: {
                id: pollId
            },
           include: {
            options: {
                select: {
                    id: true,
                    title: true
                }
            }
           }
        })
 
        return reply.send({ poll })
    })
} 