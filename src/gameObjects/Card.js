import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";
import fabricUtils from "@/assets/js/fabricUtils";

export let Card = fabric.util.createClass(fabric.Rect, {
    type: "Card",
    height: 150,
    width: 100,
    defaultFill: "#e9c46a",
    fill: "#E4E5E5",
    defaultLabel: "Carte vide",

    initialize: function (options) {
        options || (options = {});
        this.callSuper("initialize", options);
        this.set({
            label: options.label || this.defaultLabel,
            height: options.height || this.height,
            width: options.width || this.width,
            fill: options.fill || this.defaultFill,
            id: options.id || uuidv4(),
        });
        fabricUtils.hideControls(this)
    },

    getMenu: function (canvas) {
        const menu = new Menu([
            new MenuItem("Rotate 90", () => {
                this.rotate(this.angle + 90);
                canvas.requestRenderAll();
            }, "http://share.pacary.net/PAO/icone/turnRight.svg"),
            new MenuItem("Rotate 180", () => {
                this.rotate(this.angle + 180);
                canvas.requestRenderAll();
            }, "http://share.pacary.net/PAO/icone/turn180.svg"),
            new MenuItem("Rote -90", () => {
                this.rotate(this.angle - 90);
                canvas.requestRenderAll();
            }, "http://share.pacary.net/PAO/icone/turnLeft.svg"),
        ]);
        if (this.isDeckIntersection(canvas)) {
            const thisCard = this;
            menu.add(
                new MenuItem("Add to Deck", () => {
                    this.getDeckIntersection(canvas).addToDeck(thisCard);
                    canvas.discardActiveObject().renderAll();
                    canvas.remove(thisCard);
                }, "http://share.pacary.net/PAO/icone/card-add.svg")
            );
        }
        return menu;
    },

    onMouseDown: function (canvas, e) {
        if (e.button === 3) {
            canvas.setActiveObject(this);
            this.getMenu(canvas).openMenu(true, e.pointer.x, e.pointer.y);
        }
    },
    onMoving: function (canvas) {
        this.getMenu(canvas).openMenu(false);
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
            label: this.get("label"),
            id: this.get("id"),
            type: this.get("type"),
        });
    },

    onDeseleced: function (canvas) {
        this.getMenu(canvas).openMenu(false);
    },

    getDeckIntersection: function (canvas) {
        let intersection = undefined;
        this.setCoords();
        const card = this;
        canvas.forEachObject(function (obj) {
            if (obj === card) return;
            if (obj.type === "Deck" && card.intersectsWithObject(obj)) {
                intersection = obj;
            }
        });
        return intersection;
    },
    isDeckIntersection: function (canvas) {
        return this.getDeckIntersection(canvas) !== undefined;
    },

    _render: function (ctx) {
        this.callSuper("_render", ctx);
        ctx.font = "15px Helvetica";
        ctx.fillText(this.label, -this.width / 2, -this.height / 50);
    },
});
