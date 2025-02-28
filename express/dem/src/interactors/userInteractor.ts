import { AuthUserInterface, UserInterface } from '@interfaces/UserInterface'
import { UserEntity } from '@entities/UserEntity'
import { IGetUsersPersistence, IGetUserPersistence, ICreateUserPersistence, IUpdateUserPersistence } from '@persistence/userPersistence'
import { CreateLogPersistenceInterface } from '@persistence/logPersistence'

export const getUsersInteractor = async (
    { getUsersPersistence }: { getUsersPersistence: IGetUsersPersistence},
    { take } : { take: number }
) => {

    const user: UserInterface[] = await getUsersPersistence({ take })

    return user

}

export const getUserInteractor = async (
    { getUserPersistence }: { getUserPersistence: IGetUserPersistence},
    { id } : { id : number },
) => {

    const user: UserInterface = await getUserPersistence({ id })

    return user

}

export const createUserInteractor = async (
    { createUserPersistence, createLogPersistence } : 
    { createUserPersistence: ICreateUserPersistence, createLogPersistence: CreateLogPersistenceInterface},
    { photo, first_name, last_name, email, mobile_number, password, role }: UserInterface,
    authUser: AuthUserInterface
) => {

    const user = new UserEntity({ photo, first_name, last_name, email, mobile_number, password, role })

    await user.validate('create')

    const newUser : any = await createUserPersistence({photo, first_name, last_name, email, mobile_number, password, role})

    await createLogPersistence({
        module: 'User',
        content: `Create User ${first_name} ${last_name}`,
        author_id: authUser.id
    })

    return newUser

}

export const updateUserInteractor = async (
    { updateUserPersistence, createLogPersistence } :
    { updateUserPersistence: IUpdateUserPersistence, createLogPersistence: CreateLogPersistenceInterface},
    { id, photo, first_name, last_name, email, mobile_number, role }: UserInterface,
    authUser: AuthUserInterface
) => {

    const user = new UserEntity(
        { photo, first_name, last_name, email, mobile_number, role }
    )

    await user.validate('update')

    const updatedUser : UserInterface = await updateUserPersistence({ photo, first_name, last_name, email, mobile_number, role, id })

    await createLogPersistence({
        module: 'User',
        content: `Update User ${first_name} ${last_name}`,
        author_id: authUser.id
    })

    return updatedUser

}


export const deleteUserInteractor = async (
    { deleteUserPersistence }: { deleteUserPersistence: any},
    { id } : { id : number },
) => {

    const user: UserInterface = await deleteUserPersistence({ id })

    return user

}