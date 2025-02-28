import { Request, Response } from 'express'
import { getLogsInteractor } from '@interactors/logInteractor'
import { getLogsPersistence } from '@persistence/logPersistence'
import { httpStatusCode } from '@constants/httpStatusCode'

export const getLogsController = async (
    req: Request,
    res: Response
) => {

    const { take = 10 } = req.query

    try {

        const logs = await getLogsInteractor(
            { getLogsPersistence },
            { take: +take }
        )

        return res.status(httpStatusCode.OK).json(logs)

    } catch (error) {

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }

}