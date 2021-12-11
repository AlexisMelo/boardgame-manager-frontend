import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";

export let CardImage = fabric.util.createClass(fabric.Rect, {
  type: "CardImage",

  initialize: function (options) {
    options || (options = {});
    var that = this;
    this.imageLoaded = false;
    this.imageRecto = options.urlRecto;
    this.imageVerso = options.urlVerso;
    this.currentImage = this.imageRecto;
    this.set("height", 150);
    fabric.util.loadImage(
      this.currentImage,
      function (img) {
        that.set("image", img);
        that.imageLoaded = true;
        that.dirty = true;
        that.width = 100;
        that.height = 150;
      },
      {
        crossOrigin: "annonymous",
      }
    );
    this.callSuper("initialize", options);
  },

  onDoubleClick: function (canvas) {
    this.return();
    canvas.requestRenderAll();
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      image: this.image,
    });
  },

  return: function () {
    if (this.currentImage === this.urlRecto) this.currentImage = this.urlVerso;
    else this.currentImage = this.urlRecto;
    console.log("image:", this.currentImage);
    fabric.util.loadImage(
      this.currentImage,
      function (img) {
        this.image = img;
        this.imageLoaded = true;
        this.dirty = true;
        this.width = 100;
        this.height = 150;
      },
      {
        crossOrigin: "annonymous",
      }
    );
  },

  getMenu: function (canvas) {
    return new Menu([
      new MenuItem("Return", () => {
        this.return();
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

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    console.log("render CardImage");
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
