import { getAllCategories } from 'controllers'
import { Router } from 'express'

const router = Router()

router.get('/categories', getAllCategories)

export default router
