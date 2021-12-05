import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";

export let Deck = fabric.util.createClass(fabric.Rect, {
  type: "Deck",
  height: 170,
  width: 120,
  fill: "#4379d1",
  label: "Deck",
  list: [],

  initialize: function (options) {
    options || (options = {});
    this.callSuper("initialize", options);
    this.set("label", this.label);
    this.set({
      height: options.height || this.height,
      width: options.width || this.width,
      fill: options.fill || this.fill,
      id: options.id || uuidv4(),
    });
    this.setControlsVisibility({
      tr: false,
      tl: false,
      br: false,
      bl: false,
      ml: false,
      mt: false,
      mr: false,
      mb: false,
    });
  },

  addToDeck: function (card) {
    this.list.push(card);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      label: this.get("label"),
    });
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    ctx.font = "20px Helvetica";
    ctx.fillText(this.label, -this.width / 5, -this.height / 50);
  },
});
