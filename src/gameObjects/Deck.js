import {fabric} from "fabric";

export let Deck = fabric.util.createClass(fabric.Rect, {
    type: "Deck",
    height: 170,
    width: 120,
    fill: "#4379d1",
    label: "Deck",

    initialize: function (options) {
        options || (options = {})
        this.callSuper("initialize", options)
        this.set("label", this.label)
        this.set({"height": this.height, "width": this.width, "fill": this.fill})
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
            label: this.get("label")
        })
    },

    _render: function (ctx) {
        this.callSuper("_render", ctx)
        ctx.font = "20px Helvetica"
        ctx.fillText(this.label, -this.width / 5, -this.height / 50)
    }
})