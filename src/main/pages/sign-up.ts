import { signUp } from "../../api";

signUp('zero', 'zero')
    .then(response => response.json())
    .then(body => {
        console.log(body)
    })

