import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";

export let DiceNumber = fabric.util.createClass(fabric.Rect, {
  type: "DiceNumber",

  initialize: function (options) {
    options || (options = {});
    this.callSuper("initialize", options);
    this.dirty = true;
    this.max = options.max || 6;
    this.min = options.min || 1;
    this.width = 70;
    this.height = 70;
    this.fill = "white";
    this.stroke = "black";
    this.strokeWidth = 1;
    this.number = this.newRandom();
  },

  getMenu: function (canvas) {
    return new Menu([
      new MenuItem("Roll the dice", () => {
        this.number = this.newRandom();
        this.dirty = true;
        canvas.requestRenderAll();
      }, "http://share.pacary.net/PAO/icone/dice.svg"),
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
  },

  onDoubleClick: function (canvas) {
    this.number = this.newRandom();
    this.dirty = true;
    canvas.requestRenderAll();
  },

  onDeseleced: function (canvas) {
    this.getMenu(canvas).openMenu(false);
  },
  onMoving: function (canvas) {
    this.getMenu(canvas).openMenu(false);
  },

  onMouseDown: function (canvas, e) {
    if (e.button === 3) {
      canvas.setActiveObject(this);
      this.getMenu(canvas).openMenu(true, e.pointer.x, e.pointer.y);
    }
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      number: this.get("number"),
    });
  },

  newRandom: function () {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    ctx.font = "40px Helvetica";
    ctx.fillText(this.number, this.number >= 10 ? -20 : -10, 10);
  },
});
