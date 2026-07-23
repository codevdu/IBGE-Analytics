import { Router } from "express"
import { statesRoutes } from "./states-routes"
import { dashboardRoutes } from "./dashboard-routes" 

const routes = Router()

routes.use("/api/states", statesRoutes)
routes.use("/api/dashboard", dashboardRoutes)

export { routes }