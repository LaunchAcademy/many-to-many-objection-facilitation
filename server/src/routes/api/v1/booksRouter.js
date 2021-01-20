import express from "express"

import { Book } from "../../../models/index.js"

const booksRouter = new express.Router()

booksRouter.get("/", async (req, res) => {
  try {
    const books = await Book.query()
    return res.status(200).json({ books })
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

booksRouter.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const book = await Book.query().findById(id)
    book.authors = await book.$relatedQuery("authors")
    return res.status(200).json({ book })
  } catch(error){
    return res.status(500).json({ errors: error })
  }
})

export default booksRouter