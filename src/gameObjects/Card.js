import {fabric} from "fabric";
import {v4 as uuidv4} from "uuid";

export let Card = fabric.util.createClass(fabric.Rect, {
    type: "Card",
    height: 150,
    width: 100,
    defaultFill: "#E4E5E5",
    fill: "#E4E5E5",
    defaultLabel: "Carte vide",

    initialize: function (options) {
        options || (options = {})
        this.callSuper("initialize", options)
        this.set("label", options.label || this.defaultLabel)
        this.set({
            "height": options.height || this.height,
            "width": options.width || this.width,
            "fill": options.fill || this.fill,
            "id": options.id || uuidv4()
        })
        this.setControlsVisibility({
            tr: false,
            tl: false,
            br: false,
            bl: false,
            ml: false,
            mt: false,
            mr: false,
            mb: false
        })
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
            label: this.get("label")
        })
    },

    _render: function (ctx) {
        this.callSuper("_render", ctx)
        ctx.font = "20px Helvetica"
        ctx.fillText(this.label, -this.width / 2, -this.height / 50)
    }
})