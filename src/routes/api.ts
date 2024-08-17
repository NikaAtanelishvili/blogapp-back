import { getAllCategories, login, postBlog } from 'controllers'
import { Router } from 'express'
import { authMiddleware, upload } from 'middlewares'

const router = Router()

router.get('/categories', getAllCategories)

router.post('/login', login)

router.post('/blog', authMiddleware, upload.single('image'), postBlog)

export default router
