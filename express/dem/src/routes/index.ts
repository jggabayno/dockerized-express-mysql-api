import { Express } from 'express'
// import logsRouter from '@routes/logs'
import authRouter from '@routes/auth'
// import usersRouter from '@routes/users'
// import validationsRouter from '@routes/validations'

const useRoutes = (
    app: Express
) => {
    app.use('/api/auth', authRouter)
    // app.use('/api/users', usersRouter)
    // app.use('/api/logs', logsRouter)
    // app.use('/api/validations', validationsRouter)
}

export default useRoutes