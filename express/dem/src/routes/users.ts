import express from 'express'

import {
    authMiddleware
} from '@middleware/authMiddleware'

import {
    getUsersController,
    getUserController,
    postUserController,
    putUserController,
    deleteUserController
} from '@controllers/userController'

const router = express.Router()

router.get('/', authMiddleware, getUsersController)
router.get('/:id', authMiddleware, getUserController)
router.post('/', authMiddleware, postUserController)
router.put('/:id', authMiddleware, putUserController)
router.delete('/:id', authMiddleware, deleteUserController)

export default router