import { Router } from "express"
import * as clientController from "../controllers/clients.controller.js"

const router = Router()

router.get("/clientes", clientController.getClients)
router.get("/clientes/nuevo", clientController.newClientForm)
router.post("/clientes/nuevo", clientController.saveClient)
router.get("/clientes/:id", clientController.getClientBooks)

export default router