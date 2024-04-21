import { access, signOut as SignOutApi } from "./auth"

export const OK_SYM = Symbol("ok")
export const errorHandler = async <SuccessBody>(fetcher: Function) => {
  try {
    const res = (await fetcher()) as Response
    if (res.ok)
      return {
        [OK_SYM]: true,
        status: res.status,
        body: (await res.json()) as SuccessBody,
      }
    else
      return {
        [OK_SYM]: false,
        error: { status: res.status, message: await res.json() },
      }
  } catch (error: any) {
    return {
      [OK_SYM]: false,
      error: { status: error?.name, message: error?.message },
    }
  }
}

export const isAuthoriz = () => {
  access()
    .then((data) => {
      if (!data[OK_SYM]) window.location.pathname = "/signin.html"
    })
    .catch(() => {
      window.location.pathname = "/signin.html"
    })
}

export const signOut = () => {
  SignOutApi().then((data) => {
    if (data[OK_SYM]) window.location.pathname = "/signin.html"
  })
}
