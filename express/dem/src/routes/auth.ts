import express from 'express'

import {
    token,
    login,
    logout,
    register
} from '@controllers/authController'

const router = express.Router()

router.post('/token', token)
router.post('/login', login)
router.delete('/logout', logout)
router.post('/register', register)
 
export default router