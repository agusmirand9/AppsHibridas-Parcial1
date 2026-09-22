import * as bookService from "../../services/books.service.js"

export async function getBooks(req, res) {
    try{
        const filtros = req.query
        const libros = await bookService.getBooks(filtros)
        res.status(200).json(libros)
    }catch(error) {
        res.status (503).json({ message: "Error interno del servidor"})
    }
}


export async function getBookById(req, res) {
    try {
        const id = req.params.id
        const libro = await bookService.getBookById(id)
        if (libro) res.status(200).json(libro)
        else res.status(404).json({ message: "Libro no encontrado" })
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function saveBook(req, res) {
    try {
        const { clienteId, ...libro } = req.body
        const nuevoLibro = await bookService.saveBook(libro, clienteId)
        res.status(201).json(nuevoLibro)
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function replaceBook(req, res) {
    try {
        const id = req.params.id
        const libro = await bookService.replaceBook(req.body, id)
        if (libro) res.status(202).json(libro)
        else res.status(404).json({ message: "Libro no encontrado" })
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function updateBook(req, res) {
    try {
        const id = req.params.id
        const libro = await bookService.updateBook(req.body, id)
        if (libro) res.status(202).json(libro)
        else res.status(404).json({ message: "Libro no encontrado" })
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function deleteBook(req, res) {
    try {
        const id = req.params.id
        const libro = await bookService.deleteBookLogic(id)
        if (libro) res.status(202).json(libro)
        else res.status(404).json({ message: "Libro no encontrado" })
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}