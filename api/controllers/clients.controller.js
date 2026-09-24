import * as clientService from "../../services/clients.service.js"
import * as bookService from "../../services/books.service.js"
import { ObjectId } from "mongodb"

const CAMPOS_CLIENTE = ["nombre", "foto", "descripcion"]

function limpiarCliente(body) {
    const cliente = {}
    for (const campo of CAMPOS_CLIENTE) cliente[campo] = body[campo]
    return cliente
}

export async function getClients(req, res) {
    try {
        const clientes = await clientService.getClients()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function saveClient(req, res) {
    try {
        const cliente = await clientService.saveClient(limpiarCliente(req.body))
        res.status(201).json(cliente)
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function getClientBooks(req, res) {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) return res.status(400).json({ message: "ID inválido" })

        const libros = await bookService.getBooksByClient(id)
        res.status(200).json(libros)
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" })
    }
}