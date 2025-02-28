import { UserInterface } from '@interfaces/UserInterface'
import query from '@services/mysql/query'
import statement from '@constants/statements'

export type IGetUsersPersistence = typeof getUsersPersistence
export type IGetUserPersistence = typeof getUserPersistence
export type ICreateUserPersistence = typeof createUserPersistence
export type IUpdateUserPersistence = typeof updateUserPersistence

export const getUsersPersistence = async (
    queryBody: { take: number }
): Promise<UserInterface[]> => {
    const users : UserInterface[] = await query({statement: statement.SELECT_USERS, data: queryBody })
    return users
}

export const getUserPersistence = async (
    { id, email } : { id?: number, email?: string }
): Promise<UserInterface> => {

    const user : UserInterface = await query({statement: statement.SELECT_USER, data: { id: id || '', email: email || '' }})
    return user
}

export const createUserPersistence = async (
    user: UserInterface
): Promise< { data: [] | null, error: [] | null } | any > => {
 
    try {
        
        const newUser = await query({statement: statement.CREATE_USER, data: user})

        return {
            data: {id: newUser.insertId, ...user},
            error: null,
        }

    } catch (e: any) {

        const dbErrors = [
            {
                constraint: 'unique_user_email',
                field: 'email',
                message: 'A user with that field already exists'
            },
            {
                constraint: 'unique_user_mobile_number',
                field: 'mobile_number',
                message: 'A user with that field already exists'
            },
            {
                constraint: 'unique_user_name',
                field: 'first_name last_name',
                message: 'A user with that combined values of first_name and last_name already exists'
            }
        ]

        dbErrors.forEach(({ constraint, field, message }) => {
            if(e.message.includes(constraint)) {
                throw new Error(JSON.stringify({ data: null, error: { field, message } }))
            }
        })
    }
}

export const updateUserPersistence = async (
    user: UserInterface
): Promise<UserInterface | any> => {

    try {

        const updatedUser = await query({statement: statement.UPDATE_USER, data: user})
 
        return {
            data: {id: updatedUser.insertId, ...user},
            error: null,
        }

    } catch (e: any) {

        const dbErrors = [
            {
                constraint: 'unique_user_email',
                field: 'email',
                message: 'A user with that field already exists'
            },
            {
                constraint: 'unique_user_mobile_number',
                field: 'mobile_number',
                message: 'A user with that field already exists'
            },
            {
                constraint: 'unique_user_name',
                field: 'first_name last_name',
                message: 'A user with that combined values of first_name and last_name already exists'
            }
        ]

        dbErrors.forEach(({ constraint, field, message }) => {
            if(e.message.includes(constraint)) {
                throw new Error(JSON.stringify({ data: null, error: { field, message } }))
            }
        })
    }
}


export const deleteUserPersistence = async (
    { id } : { id?: number }
): Promise<UserInterface  | any> => {

    
    try {

        const user : UserInterface = await query({statement: statement.DELETE_USER, data: { id }})
     console.log('user', user)
        return {
            data: { id },
            error: null,
        }

    } catch (e: any) {

console.log('e', e)
    }

}