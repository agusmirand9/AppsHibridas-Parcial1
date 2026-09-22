import * as bookService from "../services/books.service.js"
import * as bookView from "../views/books.view.js"


export async function getBooks(req, res) {
    try {
        const filtros = req.query
        const libros = await bookService.getBooks(filtros)
        res.send(bookView.createBooksPage(libros))
    } catch (error) {
        res.send(bookView.pageError(404, "Página no encontrada"))
    }
}


export async function getBookById(req, res) {
    try {
        const id = req.params.id
        const libro = await bookService.getBookById(id)
        res.send(bookView.createDetailPage(libro))
    } catch (error) {
        res.send(bookView.pageError(404, "Libro no encontrado"))
    }
}


export function newBookForm(req, res) {
    try {
        res.send(bookView.newBookForm())
    }catch(error){
        res.send(bookView.pageError(404, "Pagina no encontrada"))
    }
}

export async function saveBook(req, res) {
    try{
        const libro = await bookService.saveBook(req.body)
        res.send(bookView.createDetailPage(libro))
    }catch(error){
        res.send(bookView.pageError(404, "Pagina no encontrada"))
    }
}

export async function editBookForm(req, res ){
    try{
        const id = req.params.id
        const libro = await bookService.getBookById(id)
        res.send(bookView.editBookForm(libro))

    }catch(error){
        res.send(bookView.pageError(404, "Pagina no encontrada"))
    }
}

export async function editBook(req, res) {
    try {
        const id = req.params.id
        const libro = await bookService.replaceBook(req.body, id)
        res.send(bookView.createDetailPage(libro))
    } catch (error) {
        res.send(bookView.pageError(404, "Página no encontrada"))
    }
}

export async function deleteBookForm(req, res) {
    try {
        const id = req.params.id
        const libro = await bookService.getBookById(id)
        res.send(bookView.deleteBookForm(libro))
    } catch (error) {
        res.send(bookView.pageError(404, "Página no encontrada"))
    }
}

export async function deleteBook(req, res) {
    try {
        const id = req.params.id
        const libro = await bookService.deleteBookLogic(id)
        res.send(bookView.createDetailPage(libro))
    } catch (error) {
        res.send(bookView.pageError(404, "Página no encontrada"))
    }
}