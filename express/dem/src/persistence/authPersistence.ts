import { 
    AuthUserInterface,
    UserInterface
} from "@interfaces/UserInterface"

import {
    accessToken,
    refreshToken,
    verifyRefreshToken
} from '@utilities/security/jwt'

export interface RefreshTokensInterface {
    refreshTokens: string[]
    insert: (key: string) => void
    isExist: (key: string) => boolean
    remove: (key: string) => void
}

export type ILoginPersistence = typeof loginPersistence
export type ITokenPersistence = typeof tokenPersistence

export let refreshTokensPersistence: RefreshTokensInterface = {
    refreshTokens: [],
    isExist: function (token) {
        return this.refreshTokens.includes(token)
    },
    insert: function (token) {
        this.refreshTokens.push(token)
    },
    remove: function (token) {
        this.refreshTokens = this.refreshTokens.filter(refreshToken => refreshToken != token)
    }
}

export const loginPersistence = (
    user: UserInterface
) =>
{
    const authUser : AuthUserInterface = { id: Number(user.id), role: user.role }

    const access = accessToken(authUser)
    const refresh = refreshToken(authUser)

    refreshTokensPersistence.insert(refresh)

    delete user.password

    const data = { token: { access, refresh }, user }

    return { data, error: null }

}

export const tokenPersistence = (
    refresh_token: string
) =>
{
    const verifiedRefreshTokenData = verifyRefreshToken(refresh_token)

    return  {
        data: verifiedRefreshTokenData,
        error: null,
    }

}