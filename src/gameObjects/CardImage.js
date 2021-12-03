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
        console.log("width:", img.width);
        console.log("height:", img.height);
        that.set("image", img);
        that.imageLoaded = true;
        that.dirty = true;
        that.width = img.width;
        that.height = img.height;
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
    this.imageLoaded &&
      ctx.drawImage(
        this.image,
        -(this.width / 2),
        -(this.height / 2),
        this.width,
        this.height
      );
  },
});
