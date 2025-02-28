import express from 'express'

import {
    authMiddleware
} from '@middleware/authMiddleware'

import {
  getValidationsController
} from '@controllers/validationController'

const router = express.Router()

router.get('/', authMiddleware, getValidationsController)

export default router