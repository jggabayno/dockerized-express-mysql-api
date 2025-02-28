import {
    CredentialInterface
} from '@interfaces/CredentialInterface'

import { 
    AuthUserInterface,
    UserInterface
} from '@interfaces/UserInterface'

import {
    LoginEntity,
    LogoutEntity,
    TokenEntity
} from '@entities/AuthEntity'

import {
    UserEntity
} from '@entities/UserEntity'
import jwt, { VerifyErrors } from 'jsonwebtoken'

import { 
    IGetUserPersistence,
    ICreateUserPersistence
} from '@persistence/userPersistence'

import { 
    ILoginPersistence,
    RefreshTokensInterface,
    ITokenPersistence,
} from '@persistence/authPersistence'

import { 
    ISendEmailPersistence
} from '@persistence/sendEmailPersistence'
import { hash } from '@utilities/security/bcrypt'

export const loginInteractor = async (
    { getUserPersistence, loginPersistence } : 
    { getUserPersistence: IGetUserPersistence, loginPersistence: ILoginPersistence},
    { email, password}: CredentialInterface
) => {

    const authEntity = new LoginEntity({ email, password })

    const user = await authEntity.validate({ getUserPersistence })
 
    const authUser = loginPersistence(user)

    return authUser

}

export const logoutInteractor = async (
    { refreshTokensPersistence }: { refreshTokensPersistence: RefreshTokensInterface},
    { token }: { token: string },
) => {
 
    const valToken = new LogoutEntity({ token })
    await valToken.validate()

    refreshTokensPersistence.remove(token)
    
}

export const registerInteractor = async (
    { createUserPersistence, sendEmailPersistence } :
    { createUserPersistence: ICreateUserPersistence, sendEmailPersistence: ISendEmailPersistence},
    { photo, first_name, last_name, email, mobile_number, password, role }: UserInterface
) => {

    const user = new UserEntity({ photo, first_name, last_name, email, mobile_number, password, role })

    await user.validate('register')
    
    const newUser = await createUserPersistence({ photo, first_name, last_name, email, mobile_number, password:  await hash(password), role })

    await sendEmailPersistence({
        email: user.email,
        subject: 'Welcome to the EMBP site!',
        body: `Hello ${user.first_name}, Welcome to the EXP site!`
    })

    return newUser
    
}

export const tokenInteractor = async (
    { refreshTokensPersistence, tokenPersistence }: { refreshTokensPersistence: RefreshTokensInterface, tokenPersistence: ITokenPersistence},
    { refresh_token } : {refresh_token : string}
) => {

    const token = new TokenEntity({ refresh_token })
    
    await token.validate({ refreshTokensPersistence })

    return tokenPersistence(refresh_token)
}