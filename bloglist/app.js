import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import config from "./utils/config.js"
import blogsRouter from "./controllers/blogs.js"

const app = express()

mongoose.set("strictQuery", false)
const mongoUrl = config.MONGODB_URI
console.log("connecting to", mongoUrl)
mongoose
	.connect(mongoUrl)
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

export default app
