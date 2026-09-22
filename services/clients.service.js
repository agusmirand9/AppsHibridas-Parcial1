import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@ah20232cp1.3imlc0v.mongodb.net/?appName=AH20232CP1"
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function getClients() {
    const filter = { eliminado: { $ne: true } }
    return await db.collection("clientes").find(filter).toArray()
}

export async function getClientById(id) {
    return await db.collection("clientes").findOne({ _id: new ObjectId(id) })
}

export async function saveClient(cliente) {
    cliente.eliminado = false
    await db.collection("clientes").insertOne(cliente)
    return cliente
}