import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"

import { routes } from "./routes"
import { swaggerDocument } from "./swagger"


const PORT = process.env.PORT || 3333
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
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(routes)

app.use((error: any, request: Request, response: Response, _: NextFunction) => {
  response.status(500).json({ message: error.message })
})

app.listen(PORT, () => console.log(`
  🚀 Server running on: http://localhost:${PORT}
  📚 Documentation at: http://localhost:${PORT}/docs
`))