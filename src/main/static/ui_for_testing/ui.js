(function () {
    O = Object, doc = document

    window.onload = function () {
        renderBirdList()
    }

    async function renderBirdList() {
        const leafletMap = await initLeafletMap()
        const response = await fetch("/api/birds")
        const json = await response.json()
        const birdTable = doc.getElementById('bird-table')
        const contents = createTableContents(json, getColumnModel(birdTable, "data-col"))
        birdTable.getElementsByTagName("tbody")[0].appendChild(contents)
    }

    async function initLeafletMap() {
        const mapResponse = await fetch("/api/grid/map")
        atlasMapSvgImage = SvgImage(await mapResponse.text())
        mapService = MapService(atlasMapSvgImage)
        const leafletMap = L.map('atlas-map', {crs: L.CRS.Simple})
        const bounds = [[0, 0], [atlasMapSvgImage.getHeight(), atlasMapSvgImage.getWidth()]]
        L.svgOverlay(atlasMapSvgImage.getSvgElement(), bounds).addTo(leafletMap)
        leafletMap.fitBounds(bounds)
        return leafletMap
    }

    function getColumnModel(table, dataColumnAttribute) {
        const headerCells = table.querySelectorAll(`[${dataColumnAttribute}]`)
        const toAttributeTextMap = attributeName => nodeList => nodeList.reduce((map, node) =>
            map.set(node.attributes[attributeName].value, node.textContent), new Map())
        const toModel = pipe(Array.from, toAttributeTextMap(dataColumnAttribute), Object.fromEntries)
        return toModel(headerCells)
    }

    function createTableContents(data, columnModel) {
        const toCell = text => O.assign(doc.createElement('td'), {textContent: text}),
              toRow = (row, cell) => row.appendChild(cell).parentElement,
              reorderProps = model => object => O.assign({}, model, object),
              removeExtraProps = model => object => object.slice(0, O.entries(model).length),
              toForm = model => pipe(reorderProps(model), O.entries, removeExtraProps(model), O.fromEntries)
        return data.map(toForm(columnModel))
                .map(object => O.values(object).map(toCell).reduce(toRow, doc.createElement('tr')))
                .reduce((fragment, row) => fragment.appendChild(row).parentNode, doc.createDocumentFragment())
    }

    function pipe(...functions) {
        return x => functions.reduce((v, f) => f(v), x)
    }

})();