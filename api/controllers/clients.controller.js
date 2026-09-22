import * as clientService from "../../services/clients.service.js"
import * as bookService from "../../services/books.service.js"

export async function getClients(req, res) {
    try {
        const clientes = await clientService.getClients()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function saveClient(req, res) {
    try {
        const cliente = await clientService.saveClient(req.body)
        res.status(201).json(cliente)
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}

export async function getClientBooks(req, res) {
    try {
        const id = req.params.id
        const libros = await bookService.getBooksByClient(id)
        res.status(200).json(libros)
    } catch (error) {
        res.status(503).json({ message: "Error interno del servidor" })
    }
}