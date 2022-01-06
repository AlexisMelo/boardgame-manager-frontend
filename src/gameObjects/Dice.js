import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";

export let Dice = fabric.util.createClass(fabric.Rect, {
  type: "Dice",

  initialize: function (options) {
    options || (options = {});
    this.callSuper("initialize", options);
    this.dirty = true;
    this.max = options.max | 6;
    this.min = options.min | 1;
    this.width = 70;
    this.height = 70;
    this.fill = "white";
    this.stroke = "black";
    this.strokeWidth = 1;
    this.number = this.newRandom()
  },

  getMenu: function (canvas) {
    return new Menu([
      new MenuItem("Roll the dice", () => {
        this.number = this.newRandom()
        this.dirty = true
        canvas.requestRenderAll()
      }),
      new MenuItem("Rotate 90", () => {
        this.rotate(this.angle + 90);
        canvas.requestRenderAll();
      }),
      new MenuItem("Rote -90", () => {
        this.rotate(-90);
        canvas.requestRenderAll();
      }),
    ]);
  },

  onDoubleClick: function (canvas) {
    this.number = this.newRandom();
    this.dirty = true
    canvas.requestRenderAll();
  },

  onDeseleced: function (canvas) {
    this.getMenu(canvas).openMenu(false);
  },

  onMouseDown: function (canvas, e) {
    if (e.button === 3)
      this.getMenu(canvas).openMenu(true, this.left, this.top);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      number: this.get("number")
    });
  },

  newRandom: function () {
    return Math.floor(Math.random() * this.max);
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    ctx.font = "40px Helvetica";
    ctx.fillText(this.number, this.number >= 10 ? -20 : -10, 10);
  },
});
