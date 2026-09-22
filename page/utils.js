export function createPage(title, content) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += `<title>${title}</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    </head><body>`
        html += `<div class="container-fluid"><h1>${title}</h1>`
        html += content
        html += `</div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    </body></html>`
    return html
}

export default { createPage }