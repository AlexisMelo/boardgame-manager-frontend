import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";

export let Card = fabric.util.createClass(fabric.Rect, {
    type: "Card",
    height: 150,
    width: 100,
    defaultFill: "#e9c46a",
    fill: "#E4E5E5",
    defaultLabel: "Carte vide",
    id: "default_id",

    initialize: function (options) {
        options || (options = {})
        this.callSuper("initialize", options)
        this.set({
            "label": options.label || this.defaultLabel,
            "height": options.height || this.height,
            "width": options.width || this.width,
            "fill": options.fill || this.defaultFill,
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


    getMenu: function (canvas) {
        const menu = new Menu([
            new MenuItem("Rotate 180", () => {
                this.rotate(this.angle + 180)
                canvas.requestRenderAll();
            }),
            new MenuItem("Rotate 90", () => {
                this.rotate(this.angle + 90)
                canvas.requestRenderAll();
            }),
            new MenuItem("Rote -90", () => {
                this.rotate(-90)
                canvas.requestRenderAll();
            }),
        ]);
        if (this.isDeckIntersection(canvas)) {
            const thisCard = this
            menu.add(
                new MenuItem("Add to Deck", () => {
                    this.getDeckIntersection(canvas).addToDeck(thisCard)
                    canvas.discardActiveObject().renderAll();
                    canvas.remove(thisCard)
                })
            )
        }
        return menu
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
            label: this.get("label"),
            id: this.get("id"),
            type: this.get("type")
        })
    },

    onDeseleced: function (canvas) {
        this.getMenu(canvas).openMenu(false);
    },

    onMouseDown: function (canvas, e) {
        if (e.button === 3) {
            this.getMenu(canvas).openMenu(true, this.left, this.top);
        }
    },
    onMoving: function (canvas) {
        this.getMenu(canvas).openMenu(false);
    },

    getDeckIntersection: function (canvas) {
        let intersection = undefined
        this.setCoords()
        const card = this
        canvas.forEachObject(function (obj) {
            if (obj === card) return
            if (obj.type === "Deck" && card.intersectsWithObject(obj)) {
                intersection = obj

            }
        })
        console.log()
        return intersection
    },
    isDeckIntersection: function (canvas) {
        return this.getDeckIntersection(canvas) !== undefined
    },


    _render: function (ctx) {
        this.callSuper("_render", ctx)
        ctx.font = "20px Helvetica"
        ctx.fillText(this.label, -this.width / 2, -this.height / 50)
    }
})