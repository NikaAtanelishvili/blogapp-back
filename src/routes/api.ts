import { getAllCategories, getBlog, login, postBlog } from 'controllers'
import { Router } from 'express'
import { authMiddleware, upload } from 'middlewares'

const router = Router()

router.get('/categories', getAllCategories)

router.post('/login', login)

router.post('/blog', authMiddleware, upload.single('image'), postBlog)

router.get('/blog/:id', getBlog)

export default router
