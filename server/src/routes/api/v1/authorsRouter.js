import express from "express"

import { Author, Book } from "../../../models/index.js"

const authorsRouter = express.Router()

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

    // const authorships = await Authorship.query().where({authorId: author.id})

    // const books = authorships.map((authorship) => {
    //   return await Book.query().findById(authorship.bookId)
    // })


    return res.status(200).json({ author })
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default authorsRouter