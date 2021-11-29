export const MenuItem = function (label, callback) {
    this.label = label
    this.callback = callback
    this.htmlTag = undefined
}

MenuItem.prototype.style = function () {
    const styleSheet = {
        "color": "#002",
        "padding": "5px 25px",
        "border-top": "1px solid #666"
    }
    for (const property in styleSheet)
        this.addStyle(property, styleSheet[property])
}


MenuItem.prototype.addStyle = function (property, value) {
    this.htmlTag.style[property] = value;
}


MenuItem.prototype.render = function () {

    this.htmlTag = document.createElement("li");
    const label = document.createTextNode(this.label);
    this.htmlTag.appendChild(label);
    this.style(this.htmlTag)

    this.htmlTag.addEventListener('click', () => {
        this.callback()
    });

    return this.htmlTag;
}