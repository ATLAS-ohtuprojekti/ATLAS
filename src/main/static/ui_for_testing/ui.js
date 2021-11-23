(function () {
    O = Object, doc = document

    window.onload = async function () {
        const atlasMap = L.map('atlas-map').setView([65.3, 27], 5)
        const response = await fetch("/api/birds")
        const json = await response.json()
        const headerCells = doc.getElementById("bird-table").querySelectorAll("[data-col]")
        const toAttributeTextMap = attributeName => nodeList => nodeList.reduce((map, node) =>
            map.set(node.attributes[attributeName].value, node.textContent), new Map())
        const toHeaderModel = pipe(Array.from, toAttributeTextMap("data-col"), Object.fromEntries)
        const contents = createTableContents(json, toHeaderModel(headerCells))
        doc.getElementById('bird-table').getElementsByTagName("tbody")[0].appendChild(contents)
    }

    function createTableContents(data, headerModel) {
        const toCell = text => O.assign(doc.createElement('td'), {textContent: text}),
              toRow = (row, cell) => row.appendChild(cell).parentElement,
              reorderProps = model => object => O.assign({}, model, object),
              removeExtraProps = model => object => object.slice(0, O.entries(model).length),
              toForm = model => pipe(reorderProps(model), O.entries, removeExtraProps(model), O.fromEntries)
        return data.map(toForm(headerModel))
                .map(object => O.values(object).map(toCell).reduce(toRow, doc.createElement('tr')))
                .reduce((fragment, row) => fragment.appendChild(row).parentNode, doc.createDocumentFragment())
    }

    function pipe(...functions) {
        return x => functions.reduce((v, f) => f(v), x)
    }

})();