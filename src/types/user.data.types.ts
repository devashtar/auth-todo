export type IBodyReq = {
    readonly email: string,
    readonly password: string
}

export type IUserData = {
    accessToken: string,
    refreshToken: string,
    userId: string,
    expiresAccessToken: number
}