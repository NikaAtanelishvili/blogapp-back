import { Handler } from 'express'
import { Blog } from 'models'
import { blogValidationSchema } from 'schemas'
import { v4 as uuidv4 } from 'uuid'

export const postBlog: Handler = async (req, res, next) => {
  try {
    const blogData = {
      id: uuidv4(), // Generate a unique ID for URLs
      title: req.body.title,
      description: req.body.description,
      image: req.file?.filename, // Extract the filename from the uploaded file
      publish_date: req.body.publish_date,
      categories: JSON.parse(req.body.categories).map(Number), // "[1,2,3,4...]" => [1,2,3,4...]
      author: req.body.author,
      email: req.body.email,
    }

    const { error: validationError } = blogValidationSchema.validate(blogData)

    if (validationError) {
      const error: any = new Error(validationError.message.replace(/\"/gi, ''))
      error.statusCode = 422
      throw error
    }

    const blog = new Blog(blogData)
    await blog.save()

    res.status(201).json({ message: 'Blog was posted successfully' })
  } catch (err) {
    next(err)
  }
}

export const getBlog: Handler = async (req, res, next) => {
  try {
    const blogId = req.params.id

    // Find the blog by ID in blogs collection
    const blog = await Blog.findOne({ id: blogId })

    if (!blog) {
      return res.status(404).json({ message: 'Blog was not found' })
    }
    // Add the image URL to the blog object
    blog.image = `${req.protocol}://${req.get('host')}/uploads/${blog.image}`

    res.status(200).json(blog)
  } catch (err) {
    next(err)
  }
}

export const getBlogs: Handler = async (req, res, next) => {
  try {
    const blogs = await Blog.find()

    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs were found' })
    }

    for (let i = 0; i < blogs.length; i++) {
      blogs[i].image =
        `${req.protocol}://${req.get('host')}/uploads/${blogs[i].image}`
    }

    res.status(200).json(blogs)
  } catch (err) {
    next(err)
  }
}
