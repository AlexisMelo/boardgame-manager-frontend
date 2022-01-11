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
    const menu = new Menu([
      new MenuItem("Return", () => {
        this.turn();
        canvas.requestRenderAll();
      }),
      new MenuItem("Rotate 90", () => {
        this.rotate(this.angle + 90);
        canvas.requestRenderAll();
      }, "http://share.pacary.net/PAO/icone/turnRight.svg"),
      new MenuItem("Rotate 180", () => {
        this.rotate(this.angle + 180);
        canvas.requestRenderAll();
      }, "http://share.pacary.net/PAO/icone/turn180.svg"),
      new MenuItem("Rote -90", () => {
        this.rotate(this.angle - 90);
        canvas.requestRenderAll();
      }, "http://share.pacary.net/PAO/icone/turnLeft.svg"),
    ]);
    if (this.isDeckIntersection(canvas)) {
      const thisCard = this;
      menu.add(
        new MenuItem("Add to Deck", () => {
          this.getDeckIntersection(canvas).addToDeck(thisCard);
          canvas.discardActiveObject().renderAll();
          canvas.remove(thisCard);
        }, "http://share.pacary.net/PAO/icone/card-add.svg")
      );
    }
    return menu;
  },

  getDeckIntersection: function (canvas) {
    let intersection = undefined;
    this.setCoords();
    const card = this;
    canvas.forEachObject(function (obj) {
      if (obj === card) return;
      if (obj.type === "Deck" && card.intersectsWithObject(obj)) {
        intersection = obj;
      }
    });
    return intersection;
  },
  isDeckIntersection: function (canvas) {
    return this.getDeckIntersection(canvas) !== undefined;
  },

  onDeseleced: function (canvas) {
    this.getMenu(canvas).openMenu(false);
  },

  onMouseDown: function (canvas, e) {
    if (e.button === 3) {
      canvas.setActiveObject(this);
      this.getMenu(canvas).openMenu(true, e.pointer.x, e.pointer.y);
    }
  },
  onMoving: function (canvas) {
    this.getMenu(canvas).openMenu(false);
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
