(function () {
    O = Object, doc = document
    const atlasMap = AtlasMap()
    const getMapService = GetMapService(atlasMap)

    window.onload = function () {
        renderBirdList()
    }

    async function renderBirdList() {
        const response = await fetch("/api/birds")
        const json = await response.json()
        const birdTable = doc.getElementById('bird-table')
        const rows = createTableRows(json, getColumnModel(birdTable, "data-col"))
        const atlasMapSvgImage = await atlasMap.getSvgImage()
        const leafletSvgImage = atlasMapSvgImage.copy()
        const leafletMap = initLeafletMap(leafletSvgImage)
        const changeMapData = async (event) => {
            const id = event.currentTarget.getAttribute("id").split(".")[1]
            const json = await (await fetch( "/api/species/data?id=" + id)).json()
            const speciesMap = (await getMapService()).getSpeciesMap(json)
            leafletSvgImage.getSvgElement().getElementById("overlay")
                .replaceWith(speciesMap.getElementById("overlay"))
        }
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

    function GetMapService(atlasMap) {
        let mapService
        return async () => typeof mapService === 'undefined' ?
            mapService = MapService(await atlasMap.getSvgImage()) : mapService
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
        const rows = data.map(toForm(columnModel))
            .map(object => O.values(object).map(toCell).reduce(toRow, doc.createElement('tr')))
        rows.forEach((row, i) => row.setAttribute('id', data[i].species_id))
        return rows
    }

    function pipe(...functions) {
        return x => functions.reduce((v, f) => f(v), x)
    }

})();