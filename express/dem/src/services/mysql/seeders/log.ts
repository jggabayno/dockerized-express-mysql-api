import statement from '../../../constants/statements'

const log = {
    module: 'User',
    content: 'Create Admin Account',
    author_id: 1,
}

export default {
    data: Object.values(log),
    statement: statement.CREATE_LOG
}