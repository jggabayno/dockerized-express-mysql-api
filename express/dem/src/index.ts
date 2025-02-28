import express, { Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import useRoutes from '@routes/index'

dotenv.config()

const app = express()
app.use('/images', express.static('public/images'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())
app.use(helmet())
app.disable('x-powered-by')
app.get('/', (_, res: Response) => res.send('embp'))

useRoutes(app)
console.log('running..', process.env.PORT || process.env.DEM_BEND_PORT);
app.listen(process.env.PORT || process.env.DEM_BEND_PORT, () => console.info('Server Started'))