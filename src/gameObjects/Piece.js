import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";
import { v4 as uuidv4 } from "uuid";

export let Piece = fabric.util.createClass(fabric.Image, {
  type: "Piece",
  src: null,

  initialize: function (options) {
    options || (options = {});

    this.set({
      src: options.src,
      id: options.id || uuidv4(),
      height: options.height || 70,
      width: options.width || 70
    })

    let imageElement = document.createElement("img")
    imageElement.src = options.src
    imageElement.alt = options.alt || "Alternative text"

    options.width = this.width
    options.height = this.height

    this.callSuper("initialize", imageElement, options);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      id: this.id,
      src: this.src
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

  onDeseleced: function (canvas) {
    this.getMenu(canvas).openMenu(false);
  },

  onMouseDown: function (canvas, e) {
    if (e.button === 3)
      this.getMenu(canvas).openMenu(true, this.left, this.top);
  },

  _render: function (ctx) {
    let imageElement = document.createElement("img")
    imageElement.src = this.src
    imageElement.alt = this.alt
    this.callSuper("_render", ctx)
    ctx.drawImage(
      imageElement,
      -(this.width / 2),
      -(this.height / 2),
      this.width,
      this.height
    )
  }
});
