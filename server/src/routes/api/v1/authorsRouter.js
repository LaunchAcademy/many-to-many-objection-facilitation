import express from "express"

import { Author } from "../../../models/index.js"

const authorsRouter = new express.Router()

authorsRouter.get("/", async (req, res) => {
  try {
    const authors = await Author.query()
    return res.status(200).json({ authors })
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

authorsRouter.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const author = await Author.query().findById(id)
    author.books = await author.$relatedQuery("books")
    return res.status(200).json({ author })
  } catch(error){
    return res.status(500).json({ errors: error })
  }
})

export default authorsRouter