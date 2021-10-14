const { DOMImplementation, XMLSerializer, DOMParser } = require('xmldom')

function SvgImage(svgDocument) {
    const xmlSerializer = new XMLSerializer()
    const namespace = 'http://www.w3.org/2000/svg'
    let doc, svg

    const docType = typeof svgDocument
    if (docType === 'undefined') doc = createEmptyDocument()
    else if (docType === 'string') doc = parseDocument(svgDocument)
    else doc = svgDocument
    svg = doc.documentElement

    function parseDocument(svgDoc) {
        const domParser = new DOMParser()
        return  domParser.parseFromString(svgDoc, "image/svg+xml")
    }

    function createEmptyDocument() {
        const domImplementation = typeof document === "undefined" ?
            new DOMImplementation() : document.implementation
        return domImplementation.createDocument(namespace, 'svg')
    }

    return {
        setDimensions: function(width, height) {
            svg.setAttribute('width', width)
            svg.setAttribute('height', height)
            return this
        },
        setViewBox: function (minX, minY, width, height) {
            svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`)
            return this
        },
        addCircle: function (propertyMap) {
            const circle = doc.createElementNS(namespace, 'circle')
            mapPropertiesToAttributes(propertyMap, circle)
            svg.appendChild(circle)
            return this
        },
        addGroupFromStrings: function (svgStringArray, propertyMap) {
            const group = doc.createElementNS(namespace, 'g')
            mapPropertiesToAttributes(propertyMap, group)
            svg.appendChild(group)
            svgStringArray.forEach(str => {
                svgElement = parseDocument(str)
                group.appendChild(svgElement)
            })
            return this
        },
        addElementFromString: function (svgString) {
            const svgElement = parseDocument(svgString)
            svg.appendChild(svgElement)
            return this
        },
        setAttribute: function (id, propertyMap, color) {
            const allElements = doc.querySelectorAllElements()
            console.log(allElements)
            const circle = doc.getElementById(id)
            // console.log(`circle: {`,
            //     `id: ${circle.getAttribute('id')}, `,
            //     `cx: ${circle.getAttribute('cx')}, `,
            //     `cy: ${circle.getAttribute('cy')}, `,
            //     `fill: ${circle.getAttribute('fill')} `,
            //     `}`)
            circle.setAttribute('fill', color)
        },
        copy: function () {
           return SvgImage(doc.cloneNode(true))
        },
        serialize: function () {
            return xmlSerializer.serializeToString(svg)
        },
    }

    function mapPropertiesToAttributes(propertyMap, svgElement) {
        for (const prop in propertyMap)
            svgElement.setAttributeNS(null, prop, propertyMap[prop])
    }

}

module.exports = SvgImage