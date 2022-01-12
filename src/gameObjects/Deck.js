import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";
import {canvasMixin} from "@/mixins/canvasMixin";

const img = require("../assets/img/to_delete_when_server_side_implemented/defaultDeck.png");

export let Deck = fabric.util.createClass(fabric.Image, {
  type: "Deck",

  initialize: function (element, options) {
    options || (options = {});
    options.width = options.width || element.width
    options.height = options.height || element.height
    this.callSuper("initialize", element, options)
    this.set({
      id: options.id || uuidv4(),
      alt: element.alt || "Deck",
      src: element.src || img,
      label: options.label || "Unnamed deck",
      list: []
    })
  },

  getImageCount: function () {
    let icone;
    if (this.list.length < 10) {
      icone = this.list.length
    }
    else {
      icone = "_9"
    }
    return `http://share.pacary.net/PAO/icone/${icone}.svg`
  },

  getMenu: function (canvas) {
    const currentList = this.list
    return new Menu([
      new MenuItem(`${currentList.length} card${currentList.length > 1 ? "s" : ""}`, () => {
      }, this.getImageCount()),
      new MenuItem(`Tirer la carte du dessus`, () => {
        if (currentList.length > 0)
          canvasMixin.methods.addObjectToCanvas(canvas, this.list.pop())
      }, "http://share.pacary.net/PAO/icone/card-draw-top.svg"),
      new MenuItem(`Tirer la carte du dessous`, () => {
        if (currentList.length > 0)
          canvas.add(this.list.shift())
      }, "http://share.pacary.net/PAO/icone/card-draw-bottom.svg"),
      new MenuItem(`Tirer une carte aléatoire`, () => {
        if (currentList.length > 0) {
          const random = this.newRandomIndex()
          canvas.add(this.list[random])
          if (random > -1) {
            this.list.splice(random, 1);
          }
        }
      }, "http://share.pacary.net/PAO/icone/card-draw-middle.svg"),
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
  },

  newRandomIndex: function () {
    return Math.floor(Math.random() * this.list.length);
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

  addToDeck: function (card) {
    this.list.push(card);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      src: this.get("src"),
      label: this.get("label"),
      id: this.get("id"),
      list: this.get("list")
    });
  },
});
