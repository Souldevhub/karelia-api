let users = [
    {"username": "pl", "password": "pltest", 'token': '' },
    {"username": "jk", "password": "jktest", 'token': '' },
]

let data = [
    { "id": "1", "Firstname": "Petri", "Surname": "Laitinen"},
    { "id": "2", "Firstname": "Jyri", "Surname": "Kemppainen"}
]

const getUsers = () => {
    return users
}

const getData = () => {
    return data
}
export {
    getUsers,
    getData
}