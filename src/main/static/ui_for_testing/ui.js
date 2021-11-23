(function () {
    O = Object, doc = document
    const atlasMap = AtlasMap()

    window.onload = function () {
        renderBirdList()
    }

    async function renderBirdList() {
        const response = await fetch("/api/birds")
        const json = await response.json()
        const birdTable = doc.getElementById('bird-table')
        const rows = createTableRows(json, getColumnModel(birdTable, "data-col"))
        const atlasMapSvgImage = await atlasMap.getSvgImage()
        const leafletMap = initLeafletMap(atlasMapSvgImage)
        const changeMapData = () => atlasMapSvgImage.getSvgElement().querySelectorAll("circle").forEach(e => {
            const randomColor = Math.floor(Math.random()*16777215).toString(16)
            e.setAttribute('style', 'fill:#' + randomColor)
            e.setAttribute('display', 'block')
        })
        rows.forEach(row => row.addEventListener('click', changeMapData))
        const fragment = rows.reduce((fragment, row) =>
            fragment.appendChild(row).parentNode, doc.createDocumentFragment())
        birdTable.getElementsByTagName("tbody")[0].appendChild(fragment)
    }

    function AtlasMap() {
        let atlasMap
        const getSvgImage = async () =>
            typeof atlasMap === 'undefined' ? await fetchAtlasMapSvgImage() : atlasMap
        const fetchAtlasMapSvgImage = async () =>
            atlasMap = SvgImage(await (await fetch("/api/grid/map")).text())
        return {getSvgImage}
    }

    function initLeafletMap(atlasMapSvgImage) {
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

    function createTableRows(data, columnModel, rowListener) {
        const toCell = text => O.assign(doc.createElement('td'), {textContent: text}),
              toRow = (row, cell) => row.appendChild(cell).parentElement,
              reorderProps = model => object => O.assign({}, model, object),
              removeExtraProps = model => object => object.slice(0, O.entries(model).length),
              toForm = model => pipe(reorderProps(model), O.entries, removeExtraProps(model), O.fromEntries)
        return data.map(toForm(columnModel))
                .map(object => O.values(object).map(toCell).reduce(toRow, doc.createElement('tr')))
    }

    function pipe(...functions) {
        return x => functions.reduce((v, f) => f(v), x)
    }

})();