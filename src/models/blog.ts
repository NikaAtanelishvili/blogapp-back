import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  publish_date: { type: Date, required: true },
  categories: { type: [Number], required: true },
  author: { type: String, required: true },
  email: { type: String, required: false },
})

export default model('Blog', blogSchema)
