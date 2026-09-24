import * as bookService from "../../services/books.service.js"
import { ObjectId } from "mongodb"


export async function getBooks(req, res) {
    try {
        const filtros = req.query
        const resultado = await bookService.getBooks(filtros)
        res.status(200).json(resultado)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function getBookById(req, res) {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "ID inválido" })

        const libro = await bookService.getBookById(id)
        if (libro) res.status(200).json(libro)
        else res.status(404).json({ message: "Libro no encontrado" })
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function saveBook(req, res) {
    try {
        const { clienteId } = req.body
        const libro = bookService.limpiarLibro(req.body)
        const nuevoLibro = await bookService.saveBook(libro, clienteId)
        res.status(201).json(nuevoLibro)
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function replaceBook(req, res) {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "ID inválido" })

        const { clienteId } = req.body
        const libro = bookService.limpiarLibro(req.body)
        const libroActualizado = await bookService.replaceBook(libro, id, clienteId)
        if (libroActualizado) res.status(202).json(libroActualizado)
        else res.status(404).json({ message: "Libro no encontrado" })
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function updateBook(req, res) {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "ID inválido" })

        const { clienteId } = req.body
        const libro = bookService.limpiarLibro(req.body, { parcial: true })
        const libroActualizado = await bookService.updateBook(libro, id, clienteId)
        if (libroActualizado) res.status(202).json(libroActualizado)
        else res.status(404).json({ message: "Libro no encontrado" })
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function deleteBook(req, res) {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "ID inválido" })

        const libro = await bookService.deleteBookLogic(id)
        if (libro) res.status(202).json(libro)
        else res.status(404).json({ message: "Libro no encontrado" })
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" })
    }
}