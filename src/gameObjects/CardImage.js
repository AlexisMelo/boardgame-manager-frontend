import { fabric } from "fabric";

export let CardImage = fabric.util.createClass(fabric.Rect, {
  type: "CardImage",

  initialize: function (options) {
    options || (options = {});
    var that = this;
    this.imageLoaded = false;
    fabric.util.loadImage(
      options.url,
      function (img) {
        that.set("image", img);
        that.imageLoaded = true;
        that.dirty = true;
        that.width = img.width / 12;
        that.height = img.height / 12;
      },
      {
        crossOrigin: "annonymous",
      }
    );
    this.callSuper("initialize", options);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      image: this.image,
    });
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "#333";
    this.imageLoaded && ctx.drawImage(this.image, -15, -30, 30, 50);
  },
});
