import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";
import { v4 as uuidv4 } from "uuid";

export let DiceImage = fabric.util.createClass(fabric.Image, {
  type: "DiceImage",
  src: null,
  listFace: [],

  initialize: function (options) {
    options || (options = {});

    this.set({
      listFace: options.listFace || [],
      fill: "white",
      stroke: "black",
      strokeWidth: 1,
      width: options.width || 200,
      height: options.height || 200,
      id: options.id || uuidv4(),
    })

    this.indexActiveFace = 0 //this.newRandomIndex()

    let imageElement = document.createElement("img")
    imageElement.src = this.listFace[this.indexActiveFace]
    imageElement.alt = options.alt || "Alternative text"

    options.width = this.width
    options.height = this.height

    this.callSuper("initialize", imageElement, options);
  },

  getMenu: function (canvas) {
    return new Menu([
      new MenuItem("Roll the dice", () => {
        this.indexActiveFace = this.newRandomIndex();
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

  changeImage: function (canvas) {
    this.indexActiveFace = this.newRandomIndex()
    this.src = this.listFace[this.indexActiveFace];
    this.dirty = true;
    canvas.requestRenderAll();
  },
  onDoubleClick: function (canvas) {
    this.changeImage(canvas)
  },
  onDeseleced: function (canvas) {
    this.getMenu(canvas).openMenu(false);
  },
  onMoving: function (canvas) {
    this.getMenu(canvas).openMenu(false);
  },

  onMouseDown: function (canvas, e) {
    if (e.button === 3)
      this.getMenu(canvas).openMenu(true, this.left, this.top);
  },

  toObject: function () {
    console.log(this.listFace)
    return fabric.util.object.extend(this.callSuper("toObject"), {
      indexActiveFace: this.indexActiveFace,
      id: this.id,
      listFace: this.listFace
    });
  },

  newRandomIndex: function () {
    return Math.floor(Math.random() * this.listFace.length);
  },

  _render: function (ctx) {
    let imageElement = document.createElement("img")
    imageElement.src = this.listFace[this.indexActiveFace]
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
