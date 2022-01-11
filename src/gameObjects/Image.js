import {fabric} from "fabric";
import {v4 as uuidv4} from "uuid";
const img = require("../assets/img/no_image.jpg")

export let Image = fabric.util.createClass(fabric.Image, {
    type: "Image",
    height: 500,
    width: 500,
    alt: "Image for the game",
    defaultSrc: img,
    label: "Image",

    initialize: function (options) {
        options || (options = {})

        this.set({
            width: options.width || this.width,
            height: options.height || this.height,
            id: options.id || uuidv4(),
            alt: options.alt || this.alt,
            src: options.src || this.defaultSrc,
            label: options.label || this.label
        })

        let imageElement = document.createElement("img")
        imageElement.src = this.src
        imageElement.alt = this.alt

        options.width = this.width
        options.height = this.height

        this.callSuper("initialize", imageElement, options)
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
            src: this.get("src"),
            label: this.get("label")
        })
    },
})