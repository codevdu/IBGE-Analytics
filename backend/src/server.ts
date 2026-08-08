import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import basicAuth from "express-basic-auth"

import { routes } from "./routes"
import { swaggerDocument } from "./swagger"

const PORT = process.env.PORT || 3333
const URL_BACKEND = process.env.BACKEND_URL || `http://localhost:${PORT}`
const app = express()

const allowedOrigins = process.env.FRONT_URL || "http://localhost:5173"

app.use(cors({
  origin: (origin, callback) => {
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

const docsUser = process.env.DOCS_USER || ""
const docsPassword = process.env.DOCS_PASSWORD || ""

app.use(
  "/docs",
  basicAuth({
    challenge: true,
    users: { [docsUser]: docsPassword },
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)
app.use(routes)

app.use((error: any, request: Request, response: Response, _: NextFunction) => {
  response.status(500).json({ message: error.message })
})

app.listen(PORT, () => console.log(`
  🚀 Server running on: ${URL_BACKEND}
  📚 Documentation at: ${URL_BACKEND}/docs
`))