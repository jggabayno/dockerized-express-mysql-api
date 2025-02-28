import jwt, { VerifyErrors } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AuthUserInterface } from '@interfaces/UserInterface'
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });


const ATS: any = process.env.ACCESS_TOKEN_SECRET
const RTS: any = process.env.REFRESH_TOKEN_SECRET
const ATL: any = process.env.ACCESS_TOKEN_LIFETIME

export const accessToken = (
    user: AuthUserInterface
) => jwt.sign(user, ATS, { expiresIn: ATL })

export const refreshToken = (
    user: AuthUserInterface
) => jwt.sign(user, RTS)

export const verifyAccessToken = (
    token: string
) => jwt.verify(token, ATS, (error: VerifyErrors | null, user: any) => {

    if (error) return false

    return user
})

export const verifyRefreshToken = (
    token: string
) => jwt.verify(token, RTS, (error: VerifyErrors | null, user: any) => {

    if (error) return { data: null, error: error.message}

    const token  = accessToken(user)

    return { access_token: token }

})

export const decodeUser = (
    token: string
) => jwt.decode(token, ATS)