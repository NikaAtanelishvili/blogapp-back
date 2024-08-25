import { Handler } from 'express'
import { Blog } from 'models'
import mongoose from 'mongoose'
import { blogValidationSchema } from 'schemas'
import { v4 as uuidv4 } from 'uuid'

export const postBlog: Handler = async (req, res, next) => {
  try {
    const blogData = {
      id: uuidv4(), // Generate a unique ID for URLs
      title: req.body.title,
      description: req.body.description,
      image: req.file?.filename, // Use the filename of the file stored in GridFS
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
    // reason for deep coping: NEW BLOG.CATEGORIES IS'T TYPE Number[]
    const blog = JSON.parse(JSON.stringify(await Blog.findOne({ id: blogId })))

    if (!blog) {
      throw { message: 'Blog was not found', statusCode: 404 }
    }

    // TO TURN BLOG.CATEGORIES ([1, 2, 4...]) TO AN ACTUAL CATEGORIES (with text/background_color, title...)
    const db = mongoose.connection.db

    if (!db) {
      throw { message: 'Database is not connected', statusCode: 500 }
    }

    const categories = await db.collection('categories').find().toArray()

    blog.categories = blog.categories.map((id: number) => {
      return categories.find(category => category.id === id)
    })

    // Add the image URL to the blog object
    blog.image = `${req.protocol}://${req.get('host')}/api/file/${blog.image}`

    res.status(200).json(blog)
  } catch (err) {
    next(err)
  }
}

export const getBlogs: Handler = async (req, res, next) => {
  try {
    // reason for deep coping: NEW BLOGS[X].CATEGORIES AREN'T TYPE Number[]
    const blogs = JSON.parse(JSON.stringify(await Blog.find()))

    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs were found' })
    }

    // TO TURN BLOGS.[X].CATEGORIES ([1, 2, 4...]) TO AN ACTUAL CATEGORIES (with text/background_color, title...)
    const db = mongoose.connection.db

    if (!db) {
      throw { message: 'Database is not connected', statusCode: 500 }
    }

    const categories = await db.collection('categories').find().toArray()

    for (let i = 0; i < blogs.length; i++) {
      blogs[i].categories = blogs[i].categories.map((id: number) => {
        return categories.find(category => category.id === id)
      })

      blogs[i].image =
        `${req.protocol}://${req.get('host')}/api/file/${blogs[i].image}`
    }

    res.status(200).json(blogs)
  } catch (err) {
    next(err)
  }
}
