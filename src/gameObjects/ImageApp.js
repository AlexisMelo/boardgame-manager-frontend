import {fabric} from "fabric";
import {v4 as uuidv4} from "uuid";
const img = require("../assets/img/no_image.jpg")

export let ImageApp = fabric.util.createClass(fabric.Image, {
    type: "ImageApp",

    initialize: function (element, options) {
        options || (options = {})
        options.width = options.width || element.width
        options.height = options.height || element.height
        this.callSuper("initialize", element, options)
        this.set({
            id: options.id || uuidv4(),
            alt: element.alt || "Image for the game",
            src: element.src || img,
            label: options.label || "Image"
        })
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
            src: this.get("src"),
            label: this.get("label"),
            id: this.get("id")
        })
    },
})