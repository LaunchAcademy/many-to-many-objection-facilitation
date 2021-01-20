import express from "express"
import clientRouter from "./clientRouter.js"
const rootRouter = new express.Router()

import booksRouter from "./api/v1/booksRouter.js"
import authorsRouter from "./api/v1/authorsRouter.js"

rootRouter.use("/api/v1/authors", authorsRouter)
rootRouter.use("/api/v1/books", booksRouter)
rootRouter.use("/", clientRouter)

export default rootRouter
