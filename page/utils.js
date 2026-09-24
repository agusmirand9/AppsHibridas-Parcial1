import { categorias } from "../data/secciones.js"

export function createPage(title, content, categoriaActiva = null, mostrarTitulo = true, seccionActiva = null) {
    let chipsHtml = ""
    categorias.forEach(cat => {
        const activo = cat.value === categoriaActiva ? "active" : ""
        const href = `/libros?categories=${encodeURIComponent(cat.value)}`
        chipsHtml += `<a href="${href}" class="nav-chip ${activo}">${cat.label}</a>`
    })

    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += `<meta name="viewport" content="width=device-width, initial-scale=1" />`
    html += `<title>${title}</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">`
    html += `<link rel="preconnect" href="https://fonts.googleapis.com">`
    html += `<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Urbanist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">`
    html += `<link rel="stylesheet" href="/css/styles.css">`
    html += `</head><body>`
    html += `
    <nav class="navbar px-4">
        <a class="navbar-brand" href="/libros">Estantería</a>
        <div class="nav-chips">${chipsHtml}</div>
        <div class="d-flex gap-3">
    <a class="nav-link ${seccionActiva === "libros" ? "active" : ""}" href="/libros">Libros</a>
    <a class="nav-link ${seccionActiva === "clientes" ? "active" : ""}" href="/clientes">Escritores</a>
</div>
    </nav>`
    html += `<main class="page-container px-4 py-4">`
    if (mostrarTitulo) html += `<h1 class="page-title">${title}</h1>`
    html += content
    html += `</main><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>`
    html += `</body></html>`
    return html
}

export default { createPage }