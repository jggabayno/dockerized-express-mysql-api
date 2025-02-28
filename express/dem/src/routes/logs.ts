import express from 'express'
import { authMiddleware } from '@middleware/authMiddleware'
import { getLogsController } from '@controllers/logController'

const router = express.Router()

router.get('/', authMiddleware, getLogsController)

export default router