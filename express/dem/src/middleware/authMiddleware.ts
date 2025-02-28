import {
    NextFunction,
    Request,
    Response
} from 'express'

import {
    decodeUser,
    verifyAccessToken
} from '@utilities/security/jwt'

import {
    notAllowedMessage
} from '@utilities/responses/notAllowedMessage'
import { httpStatusCode } from '@constants/httpStatusCode'


export const authMiddleware = (
    req: Request | any,
    res: Response,
    next: NextFunction
) => {

    const token : string = req.headers.authorization?.replace('Bearer ', '')

    const isVerified = token && verifyAccessToken(token)

    if (isVerified) {

        req.authUser = decodeUser(token)

        next()

    } else {

        res.status(httpStatusCode.UNAUTORIZED).json(notAllowedMessage(req))

    }

}