import { Router } from "express"
import * as bookController from "../controllers/books.controller.js"


const router = Router()

router.get("/libros", bookController.getBooks)
router.get("/libros/nuevo", bookController.newBookForm)
router.post("/libros/nuevo", bookController.saveBook)
router.get("/libros/editar/:id", bookController.editBookForm)
router.post("/libros/editar/:id", bookController.editBook)
router.get("/libros/eliminar/:id", bookController.deleteBookForm)
router.post("/libros/eliminar/:id", bookController.deleteBook)
router.get("/libros/:id", bookController.getBookById) 





export default router