import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";

export let Piece = fabric.util.createClass(fabric.Rect, {
  type: "Piece",

  initialize: function (options) {
    options || (options = {});
    var that = this;
    this.imageLoaded = false;
    this.url = options.url;
    this.dirty = true;
    this.width = options.width;
    this.height = options.height;
    fabric.util.loadImage(
      this.url,
      function (img) {
        that.set("image", img);
        that.imageLoaded = true;
        that.dirty = true;
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

  getMenu: function (canvas) {
    return new Menu([
      new MenuItem("Rotate 180", () => {
        this.rotate(this.angle + 180);
        canvas.requestRenderAll();
      }),
      new MenuItem("Rotate 90", () => {
        this.rotate(this.angle + 90);
        canvas.requestRenderAll();
      }),
      new MenuItem("Rotate -90", () => {
        this.rotate(-90);
        canvas.requestRenderAll();
      }),
    ]);
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    console.log("render Piece");
    console.log(this.image);
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
