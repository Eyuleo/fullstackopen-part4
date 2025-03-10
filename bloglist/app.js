import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import config from "./utils/config.js"
import logger from "./utils/logger.js"
import middleware from "./utils/middleware.js"
import blogsRouter from "./controllers/blogs.js"

const app = express()

mongoose.set("strictQuery", false)
const mongoUrl = config.MONGODB_URI
logger.info("connecting to", mongoUrl)
mongoose
	.connect(mongoUrl)
	.then(() => {
		logger.info("connected to MongoDB")
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message)
	})

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
