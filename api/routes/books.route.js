import { Router } from "express"
import * as bookController from "../controllers/books.controller.js"

const router = Router()

router.get("/api/libros", bookController.getBooks)
router.get("/api/libros/:id", bookController.getBookById)
router.post("/api/libros", bookController.saveBook)
router.put("/api/libros/:id", bookController.replaceBook)
router.patch("/api/libros/:id", bookController.updateBook)
router.delete("/api/libros/:id", bookController.deleteBook)

export default router