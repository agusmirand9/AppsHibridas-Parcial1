import { MongoClient } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@ah20232cp1.3imlc0v.mongodb.net/?appName=AH20232CP1"
const CANTIDAD_A_CONSERVAR = 300
const LARGO_MAXIMO_DESCRIPCION = 400

const cliente = new MongoClient(MONGO_URI)
await cliente.connect()
const db = cliente.db("AH20232CP1")
const coleccion = db.collection("libros")

// 1. Borrar el excedente, quedándonos con los primeros N por _id
const idsAConservar = await coleccion
    .find({}, { projection: { _id: 1 } })
    .sort({ _id: 1 })
    .limit(CANTIDAD_A_CONSERVAR)
    .toArray()

const idsValidos = idsAConservar.map(doc => doc._id)

const resultadoBorrado = await coleccion.deleteMany({
    _id: { $nin: idsValidos }
})
console.log(`Documentos borrados: ${resultadoBorrado.deletedCount}`)

// 2. Recortar las descripciones largas de los que quedaron
const libros = await coleccion.find({
    description: { $exists: true, $type: "string" }
}).toArray()

let recortados = 0
for (const libro of libros) {
    if (libro.description.length > LARGO_MAXIMO_DESCRIPCION) {
        const nuevaDescripcion = libro.description.slice(0, LARGO_MAXIMO_DESCRIPCION) + "..."
        await coleccion.updateOne(
            { _id: libro._id },
            { $set: { description: nuevaDescripcion } }
        )
        recortados++
    }
}
console.log(`Descripciones recortadas: ${recortados}`)

await cliente.close()
console.log("Listo.")