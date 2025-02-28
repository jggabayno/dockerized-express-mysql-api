import { CredentialInterface } from "@interfaces/CredentialInterface"
import { ValidationErrorsInterface } from "@interfaces/ValidationErrorsInterface"
import { compare } from "@utilities/security/bcrypt"
import { stringifyResponse } from '@utilities/responses/stringifyResponse'
import { IGetUserPersistence } from "@persistence/userPersistence"

export class LoginEntity {
    email: string
    password: string | any

    constructor(credential: CredentialInterface) {
        this.email    = credential.email
        this.password = credential.password
    }

    async validate(
        { getUserPersistence }: { getUserPersistence: IGetUserPersistence }
    ) {

        let errors : ValidationErrorsInterface[] = []

        if (!this.email)                                        errors = [...errors, { field: 'email', message: 'Email is required' }]
        if (!/\S+@\S+\.\S+/.test(this.email) && !errors.length) errors = [...errors, { field: 'email', message: 'Email is invalid' }]
        if (!this.password)                                     errors = [...errors, { field: 'password', message: 'Password is required' }]
 
        // db related
 
        const user            = await getUserPersistence({ email: this.email })
        const isAuthenticated = await compare(this.password, user?.password)

        if (!errors.length && !isAuthenticated) errors = [...errors, { field: 'all', message: 'Invalid Credential' }]

        if (errors.length) throw new Error(stringifyResponse(null, errors))

        return user

    }
}

export class LogoutEntity {
    token: string

    constructor(data: { token : string }) {
        this.token = data.token
    }

    async validate() {
        let errors : ValidationErrorsInterface[] = []

        if (!this.token) errors = [...errors, { field: 'token', message: 'token is required' }]

        if (errors.length) throw new Error(stringifyResponse(null, errors))

        return;
        
    }

}

export class TokenEntity {
    refresh_token: string

    constructor(data: { refresh_token : string }) {
        this.refresh_token = data.refresh_token
    }

    async validate(
        { refreshTokensPersistence } : any
    ) {

        let errors : ValidationErrorsInterface[] = []

        if (!this.refresh_token) errors = [...errors, { field: 'refresh_token', message: 'refresh_token is required' }]
        if (!refreshTokensPersistence.isExist(this.refresh_token) && !errors.length) errors = [...errors, { field: 'refresh_token', message: 'Invalid refresh token' }]

        if (errors.length) throw new Error(stringifyResponse(null, errors))

        return;
        
    }

}