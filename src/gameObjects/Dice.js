import { fabric } from "fabric";

export let Dice = fabric.util.createClass(fabric.Rect, {
  type: "Dice",

  initialize: function (options) {
    options || (options = {});
    this.callSuper("initialize", options);
    this.max = options.max;
    this.width = 70;
    this.height = 70;
    this.fill = "white";
    this.stroke = "black";
    this.strokeWidth = 1;
    this.newRandom();
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {});
  },

  newRandom: function () {
    this.nb = Math.floor(Math.random() * this.max);
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    ctx.font = "40px Helvetica";
    if (this.max >= 10) ctx.fillText(this.nb, this.nb >= 10 ? -20 : -10, 10);
  },
});
