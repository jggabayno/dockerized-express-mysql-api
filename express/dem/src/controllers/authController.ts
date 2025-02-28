import {
    Request,
    Response
} from 'express'

import {
    tokenInteractor,
    loginInteractor,
    logoutInteractor,
    registerInteractor
} from '@interactors/authInteractor'

import {
    loginPersistence,
    refreshTokensPersistence,
    tokenPersistence
} from '@persistence/authPersistence'

import {
    createUserPersistence,
    getUserPersistence
} from '@persistence/userPersistence'

import {
    sendEmailPersistence
} from '@persistence/sendEmailPersistence'
import { httpStatusCode } from '@constants/httpStatusCode'


export const login = async (
    req: Request,
    res: Response
) => {

    const { email, password } = req.body

    try {
 
        const user = await loginInteractor(
            { getUserPersistence, loginPersistence },
            { email, password }
          )
 
        return res.status(httpStatusCode.OK).json(user)

    } catch (error: any) {

        if (error.message?.toString().includes('field')) {
            if (error.message?.toString().includes('Invalid Credential')) {
                return res.status(httpStatusCode.UNAUTORIZED).json({message: 'Invalid Credential'})
            }

            return res.status(httpStatusCode.BAD_REQUEST).json(JSON.parse(error.message))
        }

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }
}

export const logout = async (
    req: Request | any,
    res: Response
) => {

    const { token } = req.body

    try {

        await logoutInteractor(
            { refreshTokensPersistence },
            { token }
        )

        return res.sendStatus(204)
        
    } catch (error : any) {

        if (error.message?.toString().includes('field')) {
            return res.status(httpStatusCode.BAD_REQUEST).json(JSON.parse(error.message))
        }

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }
}

export const register = async (
    req: Request,
    res: Response
) => {

    const { photo, first_name, last_name, email, mobile_number, password, role } = req.body

    try {

        const user = await registerInteractor(
            { createUserPersistence, sendEmailPersistence },
            { photo, first_name, last_name, email, mobile_number, password, role }
        )

        return res.status(httpStatusCode.CREATED).json(user)

    } catch (error: any) {
 
        if (error.message?.toString().includes('field')) {
            return res.status(httpStatusCode.BAD_REQUEST).json(JSON.parse(error.message))
        }

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }
}

export const token = async (
    req: Request,
    res: Response
) => {

    const { refresh_token } = req.body

    try {

        const data = await tokenInteractor(
            { refreshTokensPersistence, tokenPersistence },
            { refresh_token }
        )

        return res.status(200).json(data)

    } catch (error : any) {

        if (error.message?.toString().includes('field')) {
            return res.status(httpStatusCode.BAD_REQUEST).json(JSON.parse(error.message))
        }

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})
        
    }
}