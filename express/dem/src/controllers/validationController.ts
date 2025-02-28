import {
    Request,
    Response
} from 'express'

import {
    getValidationsPersistence
} from '@persistence/validationPersistence'

import { httpStatusCode } from '@constants/httpStatusCode'
import { getValidationsInteractor } from '@interactors/validationInteractor'

export const getValidationsController = async (
    req: Request | any,
    res: Response,
) => {

    const { take = 10 } = req.query

    try {

        const user = await getValidationsInteractor(
            { getValidationsPersistence },
            { take: +take }
        )

        return res.status(httpStatusCode.OK).json(user)

    } catch (error) {

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }

}