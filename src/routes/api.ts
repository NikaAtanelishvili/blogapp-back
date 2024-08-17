import { getAllCategories, login } from 'controllers'
import { Router } from 'express'

const router = Router()

router.get('/categories', getAllCategories)

router.post('/login', login)

export default router
