import {
    Request,
    Response
} from 'express'

import {
    getUsersInteractor,
    getUserInteractor,
    createUserInteractor,
    updateUserInteractor,
    deleteUserInteractor
} from '@interactors/userInteractor'

import {
    getUsersPersistence,
    getUserPersistence,
    createUserPersistence,
    updateUserPersistence,
    deleteUserPersistence
} from '@persistence/userPersistence'

import {
    createLogPersistence
} from '@persistence/logPersistence'
import { httpStatusCode } from '@constants/httpStatusCode'

export const getUsersController = async (
    req: Request | any,
    res: Response,
) => {

    const { take = 10 } = req.query

    try {

        const user = await getUsersInteractor(
            { getUsersPersistence },
            { take: +take }
        )

        return res.status(httpStatusCode.OK).json(user)

    } catch (error) {

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }

}

export const getUserController = async (
    req: Request,
    res: Response
) => {

    try {

        const user = await getUserInteractor(
            { getUserPersistence },
            { id: +req.params.id },
        )
        
        if (!user?.hasOwnProperty('id')) {
            return res.status(httpStatusCode.NOT_FOUND).json({message: 'The user with given id was not found.'})
        }
        delete user.password
        return res.status(httpStatusCode.OK).json(user)

    } catch (error) {

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error')

    }

}

export const postUserController = async (
    req: any,
    res: Response
) => {

    const { photo, first_name, last_name, email, mobile_number, password, role } = req.body
 
    try {

        const user = await createUserInteractor(
            { createUserPersistence, createLogPersistence },
            { photo, first_name, last_name, email, mobile_number, password, role },
            req.authUser
        )

        return res.status(httpStatusCode.CREATED).json(user)

    } catch (error: any) {
        console.log('error', error)
        if (error.message?.toString().includes('field')) {
            return res.status(httpStatusCode.BAD_REQUEST).json(JSON.parse(error.message))
        }

        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }
}

export const putUserController = async (
    req: Response | any,
    res: Response
) => {

    const { photo, first_name, last_name, email, mobile_number, role } = req.body

    try {

        const user = await updateUserInteractor(
            { updateUserPersistence, createLogPersistence },
            { id: +req.params.id, photo, first_name, last_name, email, mobile_number, role },
            req.authUser
        )

        return res.status(httpStatusCode.OK).json(user)

    } catch (error : any) {

        if (error.message?.toString().includes('field')) {
            return res.status(httpStatusCode.BAD_REQUEST).json(JSON.parse(error.message))
        }
        
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }
}

export const deleteUserController = async (
    req: Request,
    res: Response
) => {

    try {

        const user : any = await deleteUserInteractor(
            { deleteUserPersistence },
            { id: +req.params.id },
        )

        if (user.data.hasOwnProperty('id')) {
            return res.status(httpStatusCode.OK).json(user)
        } else {
            return res.status(httpStatusCode.NOT_FOUND).json({message: 'The user with given id was not found.'})
        }

    } catch (error) {
        console.log('error', error)
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'It\'s our fault, we messed something up'})

    }

}