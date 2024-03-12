export const signUp = (_username: string, _fullname: string) => {

    return fetch('https://jsonplaceholder.typicode.com/users', {
        method: "GET"
    })

    // return fetch('https://coolpanel.ir:2525/api/signup', {
    //     method: 'POST',
    //     body: JSON.stringify({ fullname, username })
    // })
}
