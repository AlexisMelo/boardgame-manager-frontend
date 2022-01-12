import { fabric } from "fabric";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";
import { v4 as uuidv4 } from "uuid";

export let CardImage = fabric.util.createClass(fabric.Image, {
  type: "CardImage",
  src: null,

  initialize: function (element, options) {
    options || (options = {});
    options.width = options.width || element.width;
    options.height = options.height || element.height;
    this.callSuper("initialize", element, options);
    this.set({
      srcRecto: options.srcRecto,
      srcVerso: options.srcVerso,
      id: options.id || uuidv4(),
      src: options.srcRecto,
      height: options.height || 150,
      width: options.width || 100,
      alt: options.alt || "Alternative text"
    })
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

  turn: function (canvas) {
    console.log("jessaie de tourner la")
    if (this.src === this.srcRecto) {
      fabric.util.loadImage(this.srcVerso, (img) => {
        this._element.src = img.src;
        this.src = img.src
        canvas.requestRenderAll()
      });
    } else {
      fabric.util.loadImage(this.srcRecto, (img) => {
        this._element.src = img.src;
        this.src = img.src
        canvas.requestRenderAll()
      });
    }
  },

  getMenu: function (canvas) {
    const menu = new Menu([
      new MenuItem("Return", () => {
        this.turn(canvas);
        canvas.requestRenderAll();
      }, require("@/assets/img/turn_card_icon.png")),
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
  }
});
