import { createPage } from "../page/utils.js"

export function createClientsPage(clientes) {
    let html = `
    <div class="d-flex gap-2 mb-4">
        <a href="/clientes/nuevo" class="btn btn-primary">Nuevo Escritor</a>
    </div>
    <div class="client-grid">`
    clientes.forEach(cliente => {
        html += `
        <a href="/clientes/${cliente._id}" class="client-card">
            <img class="client-photo" src="${cliente.foto}" alt="${cliente.nombre}" />
            <div class="client-name">${cliente.nombre}</div>
            <div class="client-desc">${cliente.descripcion || ""}</div>
        </a>`
    })
    html += `</div>`

return createPage("Escritores", html, null, true, "clientes")
}

export function newClientForm() {
    let html = `<div class="form-page">
    <form action="/clientes/nuevo" method="POST">
        <div class="field-with-preview">
            <img id="preview-foto" class="image-preview round" src="https://placehold.co/90x90?text=Foto" alt="Vista previa" />
            <div style="flex:1">
                <div class="field">
                    <label for="foto">URL de la foto</label>
                    <input class="form-control" type="text" id="foto" name="foto" />
                    <span class="field-hint">Pegá un link de imagen, por ejemplo de picsum.photos</span>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="nombre">Nombre</label>
            <input class="form-control" type="text" id="nombre" name="nombre" />
        </div>
        <div class="field">
            <label for="descripcion">Descripción</label>
            <textarea class="form-control" id="descripcion" name="descripcion" rows="4"></textarea>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar escritor</button>
            <a href="/clientes" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
    </div>`

return createPage("Nuevo Escritor", html, null, true, "clientes")
}

export function createClientBooksPage(cliente, libros) {
    let html = `
    <div class="client-profile">
        <img src="${cliente.foto}" alt="${cliente.nombre}" />
        <div>
            <div class="client-profile-name">${cliente.nombre}</div>
            <p class="client-profile-desc">${cliente.descripcion || ""}</p>
        </div>
    </div>`

    if (libros.length === 0) {
        html += `<div class="empty-state">Todavía no tiene libros asignados.</div>`
    } else {
        html += `<div class="book-grid">`
        libros.forEach(libro => {
            html += `
            <div class="book-item">
                <a href="/libros/${libro._id}?volver=/clientes/${cliente._id}">
                    <img class="book-cover" src="${libro.thumbnail}" alt="${libro.title}" />
                </a>
                <div class="book-title">${libro.title}</div>
                <div class="book-author">${libro.categories}</div>
            </div>`
        })
        html += `</div>`
    }

    html += `<a href="/clientes" class="btn btn-secondary d-inline-block mt-4">Volver</a>`

return createPage(cliente.nombre, html, null, false, "clientes")
}

export function pageError(titulo, error) {
    return createPage(titulo, error)
}