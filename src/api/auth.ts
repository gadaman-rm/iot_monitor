import { errorHandler } from "./utility"

export interface SignUp {
    msg: string,
    remainVerifyTime: number,
    testCode: number
}
export const signUp = (username: string, fullname: string) => {
    return errorHandler<SignUp>(() => fetch('/api/signup', { method: 'POST', body: JSON.stringify({ fullname, username })}))
}

export interface SignIn {
    msg: string,
    remainVerifyTime?: number
}
export const signIn = (username: string) => {
    return errorHandler<SignIn>(() => fetch('/api/signin', { method: 'POST', body: JSON.stringify({ username })}))
}

export interface Verify {
    msg: string,
}
export const verify = async (username: string, code: number) => {
    return errorHandler<Verify>(() => fetch('/api/verify', { method: 'POST', body: JSON.stringify({ username, code })}))
}

export interface Access {
    username: string,
    exp: number,
    iat: number
}
export const access = () => errorHandler<Access>(() => fetch('/api/access', { method: 'POST' }))

export interface SignOut {
    msg: string,
}
export const signOut = async () => errorHandler<SignOut>(() => fetch('/api/signout', { method: 'POST' }))
