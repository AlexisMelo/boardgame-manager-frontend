export const MenuItem = function (label, callback, image = "https://bassets.github.io/img.svg") {
    this.label = label
    this.callback = callback
    this.htmlTag = undefined
    this.image = image
}

MenuItem.prototype.style = function (x, y) {
    const styleSheet = {
        "position": "fixed",
        "top": `${y}px`,
        "left": `${x}px`,
        'width': `${this.getSize()}px`,
        'height': `${this.getSize()}px`,
        "background": "red"

    }
    for (const property in styleSheet)
        this.addStyle(property, styleSheet[property])
}


MenuItem.prototype.addStyle = function (property, value) {
    this.htmlTag.style[property] = value;
}

MenuItem.prototype.getSize = function () {
    return 60
}
MenuItem.prototype.getCoordonne = function (nbMenuItem, total) {
    function degrees_to_radians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }

    const ecartLateral = 0
    const amplitude = 180 - (ecartLateral * 2)

    const distance = 100
    const angleN = degrees_to_radians(ecartLateral + (amplitude / total) / 2 + (amplitude / total) * (nbMenuItem - 1))

    const y = Math.sin(angleN) * distance + this.getSize() / 2
    const x = Math.cos(angleN) * distance + this.getSize() / 2
    return [x, y]
}

MenuItem.prototype.render = function (nbMenuItem, total, x, y) {

    this.htmlTag = document.createElement("div");
    //const label = document.createTextNode(this.label);
    //this.htmlTag.appendChild(label);
    const [dx, dy] = this.getCoordonne(nbMenuItem, total)
    this.style(x - dx, y - dy)

    this.htmlTag.addEventListener('click', () => {
        this.callback()
    });

    return this.htmlTag;
}