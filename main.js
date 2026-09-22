import express from "express"
import booksRoutes from "./routes/books.route.js"
import booksApiRoutes from "./api/routes/books.route.js"
import clientsApiRoutes from "./api/routes/clients.route.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(booksRoutes)
app.use(booksApiRoutes)
app.use(clientsApiRoutes)

app.listen(3333, () => console.log("Funcionando... http://localhost:3333"))