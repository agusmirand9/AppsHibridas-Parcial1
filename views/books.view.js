import { createPage } from "../page/utils.js"
import { categorias } from "../data/secciones.js"

export function createBooksPage({ libros, totalDocumentos, totalPaginas }, filtros = {}){
let html = `
    <div class="d-flex gap-2 flex-wrap mb-4 align-items-center">
        <a href="/libros/nuevo" class="btn btn-primary">Nuevo Libro</a>
        <form action="/libros" class="d-flex gap-2 ms-auto">
            <input class="form-control" type="text" name="title" placeholder="Buscar por título..." />
            <button class="btn btn-warning" type="submit">Buscar</button>
        </form>
    </div>
    <div class="book-grid">`
    libros.forEach(libro => {
        html += `
        <div class="book-item">
            <a href="/libros/${libro._id}">
                <img class="book-cover" src="${libro.thumbnail}" alt="${libro.title}" />
            </a>
            <div class="book-title">${libro.title}</div>
            <div class="book-author">${libro.authors}</div>
            <div class="book-actions">
                <a class="btn btn-secondary btn-sm" href="/libros/editar/${libro._id}">Editar</a>
                <a class="btn btn-danger btn-sm" href="/libros/eliminar/${libro._id}">Borrar</a>
            </div>
        </div>`
    })
    html += `</div>`

    html += `<p class="total-info">Total de libros: ${totalDocumentos} — total de páginas: ${totalPaginas}</p>`

    html += `<form action="/libros" method="GET" class="pagination-bar">`
    html += `<label class="form-label mb-0">Página:</label>`
    html += `<select class="form-select" name="page" style="width:auto">`
    for (let i = 1; i <= totalPaginas; i++) {
        html += `<option value="${i}">${i}</option>`
    }
    html += `</select>`
    html += `<button type="submit" class="btn btn-dark">Ir</button>`
    html += `</form>`

return createPage("Libros", html, filtros.categories || null, false, "libros")
}


export function createDetailPage(libro, volver = "/libros") {
    let html = `<div class="detail-layout">`
    html += `<img class="detail-cover" src="${libro.thumbnail}" alt="${libro.title}" />`
    html += `<div style="flex:1; min-width:280px;">`
    html += `<div class="detail-title">${libro.title}</div>`
    html += `<div class="detail-author">${libro.authors}</div>`
    html += `<p class="fst-italic">${libro.description ? libro.description.slice(0, 160) : ""}${libro.description && libro.description.length > 160 ? "..." : ""}</p>`

    html += `
    <div class="d-flex gap-2 mt-3">
        <a class="btn btn-dark" href="${libro.link}" target="_blank">Ver en Google Books</a>
        <a class="btn btn-secondary" href="/libros/editar/${libro._id}">Editar</a>
        <a class="btn btn-danger" href="/libros/eliminar/${libro._id}">Borrar</a>
        <a class="btn btn-secondary" href="${volver}">Volver</a>
    </div>`

    html += `
    <div class="detail-meta">
        <div><strong>Categoría</strong>${libro.categories}</div>
        <div><strong>Año</strong>${libro.published_year}</div>
        <div><strong>Rating</strong>${libro.average_rating}</div>
    </div>`

    html += `<p>${libro.description}</p>`

    if (libro.cliente) {
        html += `
        <div class="writer-card">
            <img src="${libro.cliente.foto}" />
            <div>
                <div style="font-size:0.75rem;color:var(--muted)">Escritor asignado</div>
                <a href="/clientes/${libro.cliente._id}">${libro.cliente.nombre}</a>
            </div>
        </div>`
    }

    html += `</div></div>`

return createPage(libro.title, html, null, false, "libros")
}

export function pageError(titulo, error) {
    return createPage(titulo, error)
}


export function newBookForm(clientes = []) {
    const opcionesClientes = clientes.map(c => `<option value="${c._id}">${c.nombre}</option>`).join("")

    let html = `<div class="form-page">
    <form action="/libros/nuevo" method="POST">
        <div class="field-with-preview">
            <img id="preview-thumbnail" class="image-preview" src="https://placehold.co/110x150?text=Portada" alt="Vista previa" />
            <div style="flex:1">
                ${campoTexto("thumbnail", "URL de la portada", "text", "", "Pegá un link de imagen, por ejemplo de Google Books o picsum.photos")}
            </div>
        </div>
        <div class="form-grid">
            ${campoTexto("title", "Título")}
            ${campoTexto("authors", "Autor/es")}
            ${campoCategoria()}
            <div class="field">
                <label for="clienteId">Escritor asignado</label>
                <select class="form-select" id="clienteId" name="clienteId">
                    <option value="">-- Sin asignar --</option>
                    ${opcionesClientes}
                </select>
            </div>
            ${campoNumero("published_year", "Año de publicación")}
            ${campoNumero("average_rating", "Rating promedio", "0.1")}
        </div>
        ${campoTexto("link", "Link a Google Books", "text", "", "URL completa, empezando con https://")}
        ${campoTexto("description", "Descripción", "textarea")}
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar libro</button>
            <a href="/libros" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
    </div>
    <script>
        const inputThumb = document.getElementById("thumbnail")
        const previewThumb = document.getElementById("preview-thumbnail")
        inputThumb.addEventListener("input", () => {
            previewThumb.src = inputThumb.value || "https://placehold.co/110x150?text=Portada"
        })
    </script>`

return createPage("Nuevo Libro", html, null, true, "libros")
}

export function editBookForm(libro, clientes = []) {
    const opcionesClientes = clientes.map(c => {
        const seleccionado = libro.cliente?._id?.toString() === c._id.toString() ? "selected" : ""
        return `<option value="${c._id}" ${seleccionado}>${c.nombre}</option>`
    }).join("")

    let html = `<div class="form-page">
    <form action="/libros/editar/${libro._id}" method="POST">
        <div class="field-with-preview">
            <img id="preview-thumbnail" class="image-preview" src="${libro.thumbnail || 'https://placehold.co/110x150?text=Portada'}" alt="Vista previa" />
            <div style="flex:1">
                ${campoTexto("thumbnail", "URL de la portada", "text", libro.thumbnail, "Pegá un link de imagen, por ejemplo de Google Books o picsum.photos")}
            </div>
        </div>
        <div class="form-grid">
            ${campoTexto("title", "Título", "text", libro.title)}
            ${campoTexto("authors", "Autor/es", "text", libro.authors)}
            ${campoCategoria(libro.categories)}
            <div class="field">
                <label for="clienteId">Escritor asignado</label>
                <select class="form-select" id="clienteId" name="clienteId">
                    <option value="">-- Sin asignar --</option>
                    ${opcionesClientes}
                </select>
            </div>
            ${campoNumero("published_year", "Año de publicación", "1", libro.published_year)}
            ${campoNumero("average_rating", "Rating promedio", "0.1", libro.average_rating)}
        </div>
        ${campoTexto("link", "Link a Google Books", "text", libro.link, "URL completa, empezando con https://")}
        ${campoTexto("description", "Descripción", "textarea", libro.description)}
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar cambios</button>
            <a href="/libros/${libro._id}" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
    </div>
    <script>
        const inputThumb = document.getElementById("thumbnail")
        const previewThumb = document.getElementById("preview-thumbnail")
        inputThumb.addEventListener("input", () => {
            previewThumb.src = inputThumb.value || "https://placehold.co/110x150?text=Portada"
        })
    </script>`

return createPage("Editar Libro", html, null, true, "libros")
}

export function deleteBookForm(libro) {
    let html = `<p>Vas a borrar: <strong>${libro.title}</strong> (${libro.authors})</p>`
    html += `
    <form action="/libros/eliminar/${libro._id}" method="POST">
        <div class="form-actions">
            <button type="submit" class="btn btn-danger">Confirmar borrado</button>
            <a href="/libros/${libro._id}" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>`

    return createPage("Eliminar Libro", html, null, true, "libros")
}


function campoTexto(name, label, tipo = "text", valor = "", hint = "") {
    const valorSeguro = valor ?? ""
    if (tipo === "textarea") {
        return `<div class="field field-full">
            <label for="${name}">${label}</label>
            <textarea class="form-control" id="${name}" name="${name}" rows="4">${valorSeguro}</textarea>
            ${hint ? `<span class="field-hint">${hint}</span>` : ""}
        </div>`
    }
    return `<div class="field">
        <label for="${name}">${label}</label>
        <input class="form-control" type="text" id="${name}" name="${name}" value="${valorSeguro}" />
        ${hint ? `<span class="field-hint">${hint}</span>` : ""}
    </div>`
}

function campoNumero(name, label, step = "1", valor = "") {
    const valorSeguro = valor ?? ""
    return `<div class="field">
        <label for="${name}">${label}</label>
        <input class="form-control" type="number" step="${step}" id="${name}" name="${name}" value="${valorSeguro}" />
    </div>`
}

function campoCategoria(seleccionada = "") {
    const opciones = categorias.map(cat =>
        `<option value="${cat.value}" ${cat.value === seleccionada ? "selected" : ""}>${cat.label}</option>`
    ).join("")

    return `<div class="field">
        <label for="categories">Categoría</label>
        <select class="form-select" id="categories" name="categories" required>
            <option value="">-- Elegí una categoría --</option>
            ${opciones}
        </select>
    </div>`
}