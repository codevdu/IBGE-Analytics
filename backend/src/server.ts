import express, { Request, Response, NextFunction } from "express"
import cors from "cors"

import { routes } from "./routes"


const PORT = process.env.PORT || 3333
const app = express()

const allowedOrigins = process.env.FRONT_URL ||  "http://localhost:5173"

app.use(cors({
    origin:(origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
    methods: "*",
    credentials: true
}))

app.use(express.json())
app.use(routes)

app.use((error: any, request: Request, response: Response, _: NextFunction) => {
    response.status(500).json({ message: error.message })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))