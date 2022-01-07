export const MenuItem = function (label, callback, image = "https://bassets.github.io/img.svg") {
    this.label = label
    this.callback = callback
    this.htmlTag = undefined
    this.image = image
}

//x du click
//y du click
MenuItem.prototype.style = function (x, y, nb, total) {

    const [dx, dy] = this.getCoordonne(nb, total)

    const styleSheet = {
        "position": "fixed",
        "top": `${y}px`,
        "left": `${x}px`,
        'width': `${this.getSize()}px`,
        'height': `${this.getSize()}px`,
        'padding': `${this.getSize() / 2}px`,
        "border-radius": "50%",
        "background": "#e8e8f3",
        "box-shadow": "7px 7px 15px rgba(55, 84, 170, 0.15), -2px -2px 20px white, inset 0px 0px 4px rgba(255, 255, 255, 0.2), inset 7px 7px 15px rgba(55, 84, 170, 0), inset -7px -7px 20px rgba(255, 255, 255, 0), 0px 0px 4px rgba(255, 255, 255, 0)"
    }

    for (const property in styleSheet)
        this.addStyle(property, styleSheet[property])

    this.htmlTag.animate([
        { transform: 'translateY(0px) translateX(0px)' },
        { transform: `translateY(${-dy}px) translateX(${-dx}px)` },
    ], {
        duration: 200,
        fill: "forwards",
        delay: 20 * nb,
    });
    console.log(dx, dy)
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
    this.htmlTag.oncontextmenu = (e) => {
        e.preventDefault()
    }
    this.style(x, y, nbMenuItem, total)

    this.htmlTag.addEventListener('click', () => {
        this.callback()
    });

    return this.htmlTag;
}