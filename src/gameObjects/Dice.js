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
    this.newRandom();
  },

  getMenu: function (canvas) {
    return new Menu([
      new MenuItem("Roll the dice", () => {
        this.newRandom();
        canvas.requestRenderAll();
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
    this.newRandom();
    canvas.requestRenderAll();
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {});
  },

  newRandom: function () {
    console.log("newRandom");
    this.nb = Math.floor(Math.random() * this.max);
    console.log(this.nb);
    return this;
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    console.log("render");
    ctx.font = "40px Helvetica";
    if (this.max >= 10) ctx.fillText(this.nb, this.nb >= 10 ? -20 : -10, 10);
  },
});
