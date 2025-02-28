import statement from '../../../constants/statements'

const user = {
    photo: 'photo.png',
    first_name: 'jonh',
    last_name: 'gabayno',
    email: 'jonh@official.com',
    mobile_number: '09392006624',
    password: '$2a$10$oNCQEA9BGV7HKZxp7J9XL.v1XN70p2zXCcjg3MohlT5Gnx2EG96xS', // user
    role: 'Admin'
}

export default {
    data: Object.values(user),
    statement: statement.CREATE_USER
}