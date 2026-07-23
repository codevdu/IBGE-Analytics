import { Router, Request, Response } from "express"
import { fetchStates } from "../services/ibge"

const statesRoutes = Router()

statesRoutes.get("/", async (_req: Request, res: Response) => {
    try {
        const states = await fetchStates()

        return res.json(states)
    } catch (error: any) {
        return res.status(500).json({
            message: `Erro ao buscar estados: ${error.message}`
        })
    }
})

export { statesRoutes }