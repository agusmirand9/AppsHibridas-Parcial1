import { Router } from "express"
import * as clientController from "../controllers/clients.controller.js"

const router = Router()

router.get("/api/clientes", clientController.getClients)
router.post("/api/clientes", clientController.saveClient)
router.get("/api/clientes/:id/libros", clientController.getClientBooks)

export default router