import {MongoClient, ObjectId} from "mongodb"

const MONGO_URI ="mongodb+srv://admin:admin@ah20232cp1.3imlc0v.mongodb.net/?appName=AH20232CP1"

const cliente = new MongoClient(MONGO_URI)
const db = cliente.db("AH20232CP1")

export async function getBooks (filtros = {}) {
    const filter = { eliminado: {$ne: true}}

    const page = parseInt(filtros.page) || 1
    const limit = parseInt(filtros.limit) || 10
    const skip = (page - 1) * limit

    if (filtros?.categories) filter.categories = { $regex: filtros.categories, $options: "i" }

    if (filtros?.title) filter.title = { $regex: filtros.title, $options: "i" }

    const total = await db.collection("libros").countDocuments(filter)
    const libros = await db.collection("libros").find(filter).skip(skip).limit(limit).toArray()
    const totalPaginas = Math.ceil(total / limit)
    libros.push({ totalDocumentos: total, totalPaginas: totalPaginas})

    return libros
}


export async function getBookById(id) {
    return await db.collection("libros").findOne({ _id: new ObjectId(id) })
        
}


export async function saveBook(libro, clienteId) {
    libro.eliminado = false
    if (clienteId) {
        const cliente = await db.collection("clientes").findOne({ _id: new ObjectId(clienteId) })
        if (cliente) {
            libro.cliente = { _id: cliente._id, nombre: cliente.nombre, foto: cliente.foto }
        }
    }
    await db.collection("libros").insertOne(libro)
    return libro
}

export async function replaceBook(libro, id){
    libro.eliminado = false
    await db.collection("libros").replaceOne(
        { _id: new ObjectId(id) },
        libro
    
    )
    return libro
}

export async function deleteBookLogic(id){
    const libro = await getBookById(id)
    await db.collection("libros").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    )
    return libro
}


export async function updateBook(libro, id) {
    await db.collection("libros").updateOne(
        { _ide: new ObjectId(id) },
        { $set: libro}
    )
    return getBookById
}

export async function getBooksByClient(clienteId) {
    const filter = { eliminado: { $ne: true }, "cliente._id": new ObjectId(clienteId) }
    return await db.collection("libros").find(filter).toArray()
}