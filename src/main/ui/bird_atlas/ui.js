(function () {
    var svgLayer

    window.onload = function () {
        const atlasMap = L.map('atlas-map').setView([65.3, 27], 5)
        addOpenStreetMapLayer(atlasMap)
        addSvgLayer(atlasMap)
        makeGetRequest("/api/birds", createTable)
    }

    function addSvgLayer(map) {
        MapService("http://localhost:3000/bird_atlas/map.svg").then(mapService => {
            svgLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgLayer.setAttribute('xmlns', "http://www.w3.org/2000/svg");
            console.log(mapService.getMap("svg"))
            svgLayer.innerHTML = mapService.getMap("svg")
            svgLayer.setAttribute('viewBox', "0 0 " + 67 + " " + 116);
            const svgElementBounds = [[55.8, 17.5], [72, 32.1]];
            L.svgOverlay(svgLayer, svgElementBounds).addTo(map);
        })
    }

    function addOpenStreetMapLayer(map) {
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a', 'b', 'c']
        }).addTo(map)
    }

    function createTable(responseText) {
        const tableContent = document.createDocumentFragment()
        const thead = document.createElement('thead')
        const headerRow = document.createElement('tr')
        const headers = ["Id", "Suomi", "Englanti", "Tieteellinen", "Lyhenne", "Ryhmä", "Julkisuus", "Ruotsi"]
        headers.forEach(header => {
            const tableData = document.createElement('td')
            tableData.textContent = header
            headerRow.appendChild(tableData)
            thead.appendChild(headerRow)
        })
        tableContent.appendChild(thead)
        const data = JSON.parse(responseText)
        const rows = data.map(toRows)
        const tbody = document.createElement('tbody')
        rows.forEach(row => tbody.appendChild(row))
        tableContent.appendChild(tbody)
        document.getElementById('atlas-table').appendChild(tableContent)
    }

    function toRows(object) {
        const tableRow = document.createElement('tr')
        tableRow.addEventListener('click', changeMapData)
        for (const property in object) {
            const tableData = document.createElement('td')
            tableData.textContent = object[property]
            tableRow.appendChild(tableData)
        }
        return tableRow
    }

    function changeMapData() {
        svgLayer.querySelectorAll("circle").forEach(e => {
                const randomColor = Math.floor(Math.random()*16777215).toString(16)
                e.setAttribute('style', 'fill:#' + randomColor + ';fill-opacity:0.5;stroke:none')
        })
    }

    function makeGetRequest(URL, callbackFunction) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', URL)
        xhr.onload = function () {
            if (xhr.status === 200) callbackFunction(xhr.responseText)
            else alert('Request to ' + URL + ' failed.  Returned status of ' + xhr.status)
        }
        xhr.send()
    }

})();