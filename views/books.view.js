import {createPage } from "../page/utils.js"

export function createBooksPage(libros){
let html = `
    <div class="d-flex gap-2 flex-wrap mb-3">
        <a href="/libros" class="btn btn-dark">Todos</a>
        <a href="/libros?categories=Fiction" class="btn btn-secondary">Ficción</a>
        <a href="/libros?categories=Juvenile Fiction" class="btn btn-secondary">Infantil</a>
        <a href="/libros?categories=Biography" class="btn btn-secondary">Biografías</a>
        <a href="/libros?categories=History" class="btn btn-secondary">Historia</a>
        <a href="/libros?categories=Religion" class="btn btn-secondary">Religión</a>
        <form action="/libros" class="d-flex gap-2">
            <input class="form-control" type="text" name="title" placeholder="Buscar por título..." />
            <button class="btn btn-warning" type="submit">Buscar</button>
        </form>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>Portada</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoría</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>`
    libros.forEach(libro => {
        if (libro?._id) {
            html += `
            <tr>
                <td><img src="${libro.thumbnail}" alt="${libro.title}" width="60" /></td>
                <td>${libro.title}</td>
                <td>${libro.authors}</td>
                <td>${libro.categories}</td>
                <td class="d-flex">
                    <a class="mx-1 btn btn-primary btn-sm" href="/libros/${libro._id}">Ver</a>
                    <a class="mx-1 btn btn-warning btn-sm" href="/libros/editar/${libro._id}">Editar</a>
                    <a class="mx-1 btn btn-danger btn-sm" href="/libros/eliminar/${libro._id}">Borrar</a>
                </td>
            </tr>
            `
        }
    })
    html += `</tbody></table>`

    const paginado = libros.pop()
    html += `<p>Página actual — total de libros: ${paginado.totalDocumentos}, total de páginas: ${paginado.totalPaginas}</p>`

    return createPage("Libros", html)
}


export function createDetailPage(libro){
    let html = `<img src="${libro.thumbnail}" alt="${libro.title}" width="150" /><br/>`
    html += `<p>Autor/es: ${libro.authors}</p>`
    html += `<p>Categoría: ${libro.categories}</p>`
    html += `<p>Año de publicación: ${libro.published_year}</p>`
    html += `<p>Rating promedio: ${libro.average_rating}</p>`
    html += `<p>Descripción: ${libro.description}</p>`
    html += `<a href="${libro.link}" target="_blank">Ver en Google Books</a><br/>`
    html += `<a href="/libros">Volver</a>`

    return createPage(libro.title, html)
}

export function pageError(titulo, error) {
    return createPage(titulo, error)
}


export function newBookForm() {
    let html = `<form action="/libros/nuevo" method="POST">`
    html += campoTexto("title", "Título")
    html += campoTexto("authors", "Autor/es")
    html += campoTexto("categories", "Categoría")
    html += campoTexto("thumbnail", "URL de la portada (imagen)")
    html += campoTexto("link", "Link a Google Books")
    html += campoTexto("description", "Descripción", "textarea")
    html += campoNumero("published_year", "Año de publicación")
    html += campoNumero("average_rating", "Rating promedio", "0.1")
    html += "<button type='submit' class='btn btn-primary mt-3'>Guardar</button>"
    html += "</form>"
    html += `<a href="/libros">Volver</a>`

    return createPage("Nuevo Libro", html)
}

export function editBookForm(libro) {
    let html = `<form action="/libros/editar/${libro._id}" method="POST">`
    html += campoTexto("title", "Título", "text", libro.title)
    html += campoTexto("authors", "Autor/es", "text", libro.authors)
    html += campoTexto("categories", "Categoría", "text", libro.categories)
    html += campoTexto("thumbnail", "URL de la portada (imagen)", "text", libro.thumbnail)
    html += campoTexto("link", "Link a Google Books", "text", libro.link)
    html += campoTexto("description", "Descripción", "textarea", libro.description)
    html += campoNumero("published_year", "Año de publicación", "1", libro.published_year)
    html += campoNumero("average_rating", "Rating promedio", "0.1", libro.average_rating)
    html += "<button type='submit' class='btn btn-primary mt-3'>Guardar</button>"
    html += "</form>"
    html += `<a href="/libros">Volver</a>`

    return createPage("Editar Libro", html)
}

export function deleteBookForm(libro) {
    let html = `<p>Vas a borrar: <strong>${libro.title}</strong> (${libro.authors})</p>`
    html += `
    <form action="/libros/eliminar/${libro._id}" method="POST">
        <button type="submit" class="btn btn-danger">Confirmar borrado</button>
    </form>`
    html += `<a href="/libros">Volver</a>`

    return createPage("Eliminar Libro", html)
}


function campoTexto(name, label, tipo = "text", valor = "") {
    if (tipo === "textarea") {
        return `<div class="mt-2"><label class="form-label">${label}: </label>
        <textarea class="form-control" name="${name}">${valor}</textarea></div>`
    }
    return `<div class="mt-2"><label class="form-label">${label}: </label>
    <input class="form-control" type="text" name="${name}" value="${valor}" /></div>`
}

function campoNumero(name, label, step = "1", valor = "") {
    return `<div class="mt-2"><label class="form-label">${label}: </label>
    <input class="form-control" type="number" step="${step}" name="${name}" value="${valor}" /></div>`
}