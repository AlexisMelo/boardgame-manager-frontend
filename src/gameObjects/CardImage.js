import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";
import { v4 as uuidv4 } from "uuid";

export let CardImage = fabric.util.createClass(fabric.Image, {
  type: "CardImage",
  src: null,

  initialize: function (options) {
    options || (options = {});

    this.set({
      srcRecto: options.srcRecto,
      srcVerso: options.srcVerso,
      id: options.id || uuidv4(),
      src: options.srcRecto,
      height: options.height || 150,
      width: options.width || 100,
      alt: options.alt || "Alternative text"
    })

    let imageElement = document.createElement("img")
    imageElement.src = this.src
    imageElement.alt = this.alt

    options.width = this.width
    options.height = this.height

    this.callSuper("initialize", imageElement, options);
  },

  onDoubleClick: function (canvas) {
    this.turn();
    this.dirty = true;
    canvas.requestRenderAll();
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      srcRecto: this.srcRecto,
      srcVerso: this.srcVerso,
      src: this.src,
      id: this.id
    });
  },

  turn: function () {
    if (this.src === this.srcRecto) {
      this.src = this.srcVerso;
    } else {
      this.src = this.srcRecto
    }
    this.dirty = true;
  },

  getMenu: function (canvas) {
    return new Menu([
      new MenuItem("Return", () => {
        this.turn();
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
