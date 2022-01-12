import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { Menu } from "@/gameObjects/Menu";
import { MenuItem } from "@/gameObjects/MenuItem";
import { canvasMixin } from "@/mixins/canvasMixin";

const img = require("../assets/img/to_delete_when_server_side_implemented/defaultDeck.png");

export let Deck = fabric.util.createClass(fabric.Image, {
  type: "Deck",
  height: 170,
  width: 120,
  displayRectoFace: false,
  list: [],
  defaultSrc: img,
  alt: "deck",

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
    return `http://share.pacary.net/PAO/icone/${icone}.png`
  },

  turn: function (canvas) {
    this.displayRectoFace = !this.displayRectoFace
    canvas.requestRenderAll();
  },

  getMenu: function (canvas) {
    const currentList = this.list
    return new Menu([
      new MenuItem("Return", () => {
        this.turn();
        canvas.requestRenderAll();
      }, "http://share.pacary.net/PAO/icone/flip.svg"),
      new MenuItem(`${currentList.length} card${currentList.length > 1 ? "s" : ""}`, () => {
      }, this.getImageCount()),
      new MenuItem(`Tirer la carte du dessus`, () => {
        if (currentList.length > 0)
          canvasMixin.methods.addObjectToCanvas(canvas, this.getTopCard(canvas))
      }, "http://share.pacary.net/PAO/icone/card-draw-top.svg"),
      new MenuItem(`Tirer la carte du dessous`, () => {
        canvasMixin.methods.addObjectToCanvas(canvas, this.getBottomCard(canvas))
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
  getTopCard(canvas) {
    if (this.list.length > 0) {
      if (this.displayRectoFace)
        canvas.add(this.list.pop())
      else
        canvas.add(this.list.shift())
    }

  },
  getBottomCard(canvas) {
    if (this.list.length > 0) {
      if (this.displayRectoFace)
        canvas.add(this.list.shift())
      else
        canvas.add(this.list.pop())
    }

  },
  getImage() {
    if (this.list.length === 0) return this.defaultSrc
    if (this.displayRectoFace) {
      const card = this.list[this.list.length - 1]
      if (card.type === "CardImage") {
        return card.srcRecto
      } else {
        return card.defaultSrc
      }
    }
    else {
      const card = this.list[0]
      if (card.type === "CardImage") {
        return card.srcVerso
      } else {
        return card.defaultSrc
      }
    }
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
    if (this.displayRectoFace) {
      this.list.unshift(card);
    }
    else {
      this.list.push(card);
    }
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      src: this.get("src"),
      label: this.get("label"),
      id: this.get("id"),
      list: this.get("list")
    });
  },

  _render: function (ctx) {
    let imageElement = document.createElement("img")
    imageElement.src = this.getImage()
    imageElement.alt = this.alt

    this.callSuper("_render", ctx);
    ctx.drawImage(
      imageElement,
      -(this.width / 2),
      -(this.height / 2),
      this.width,
      this.height
    )
  },
});
