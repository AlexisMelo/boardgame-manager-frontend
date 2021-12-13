import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";

export let DiceImage = fabric.util.createClass(fabric.Rect, {
  type: "DiceImage",

  initialize: function (options) {
    options || (options = {});
    this.callSuper("initialize", options);
    var that = this;
    this.dirty = true;
    this.listFace = options.listFace || [];
    this.fill = "white";
    this.stroke = "black";
    this.strokeWidth = 1;
    this.indActiveFace = this.newRandomInd();
    fabric.util.loadImage(
      this.listFace[this.indActiveFace],
      function (img) {
        that.set("image", img);
        that.imageLoaded = true;
        that.dirty = true;
        that.width = 70;
        that.height = 70;
      },
      {
        crossOrigin: "annonymous",
      }
    );
  },

  getMenu: function (canvas) {
    return new Menu([
      new MenuItem("Roll the dice", () => {
        this.number = this.newRandomInd();
        this.image.src = this.listFace[this.number];
        this.dirty = true;
        canvas.requestRenderAll();
      }),
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

  onDoubleClick: function (canvas) {
    this.number = this.newRandomInd();
    this.image.src = this.listFace[this.number];
    this.dirty = true;
    canvas.requestRenderAll();
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      number: this.get("number"),
    });
  },

  newRandomInd: function () {
    let tmp = Math.floor(Math.random() * this.listFace.length);
    console.log(tmp);
    return tmp;
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    console.log("render DiceImage");
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
