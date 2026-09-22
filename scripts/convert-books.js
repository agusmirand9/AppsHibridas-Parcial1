import { readFileSync, writeFileSync } from "fs"
import { parse } from "csv-parse/sync"

const csvContent = readFileSync("./scripts/books.csv", "utf-8")

const rows = parse(csvContent, {
    columns: true,      // usa la primera fila como nombres de campo
    skip_empty_lines: true
})

const libros = rows
    .filter(row => row.title && row.categories && row.thumbnail)
    .map(row => {
        // El thumbnail tiene la forma:
        // http://books.google.com/books/content?id=XXXXX&printsec=...
        // De ahi sacamos el id para construir el link a Google Books
        const match = row.thumbnail.match(/id=([^&]+)/)
        const googleId = match ? match[1] : null

        return {
            title: row.title,
            authors: row.authors || "Autor desconocido",
            description: row.description || "",
            categories: row.categories,
            thumbnail: row.thumbnail,
            link: googleId ? `https://books.google.com/books?id=${googleId}` : "",
            published_year: parseInt(row.published_year) || null,
            average_rating: parseFloat(row.average_rating) || null,
            eliminado: false
        }
    })

writeFileSync("./scripts/books.json", JSON.stringify(libros, null, 2))

console.log(`Se generaron ${libros.length} libros en books.json`)