import { Router } from "express"
import { statesRoutes } from "./states-routes"
import { dashboardRoutes } from "./dashboard-routes" 

const routes = Router()

routes.use("/states", statesRoutes)
routes.use("/dashboard", dashboardRoutes)

export { routes }