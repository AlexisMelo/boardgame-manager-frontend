<template>
  <div>
    <canvas id="canvas"> </canvas>
    <div id="menu"></div>
  </div>
</template>

<script>
import { fabric } from "fabric";

import { Deck } from "@/gameObjects/Deck";
import { CardImage } from "@/gameObjects/CardImage";
import { Card } from "@/gameObjects/Card";
import { DiceNumber } from "@/gameObjects/DiceNumber";

export default {
  name: "FabricCanvas",
  props: {
    socket: {
      type: Object,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      canvas: null,
    };
  },
  created() {
    this.extendSocket();
  },
  mounted() {
    //Initializing canvas
    this.canvas = new fabric.Canvas("canvas", {
      selectionColor: "rgba(255,0,0,0.2)",
      selectionLineWidth: 5,
      selectionBorderColor: "rgba(255,0,0,0.5)",
    });

    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
    this.resizeCanvas();

    //ajout objets sur canvas

    fabric.Image.fromURL(
      require("@/assets/monopoly-classique-plateau.jpg"),
      (oImg) => {
        let monopolyBoard = oImg.set({
          left: 600,
          top: 300,
          id: "monopoly_de_depart",
          type: "Image",
        });
        monopolyBoard.scale(0.3);
        monopolyBoard.set();
        this.canvas.add(monopolyBoard);
      }
    );

    fabric.Image.fromURL(require("@/assets/voiture.png"), (oImg) => {
      let voiture = oImg.set({
        left: 300,
        top: 300,
        id: "voiture",
        type: "Image",
      });
      //monopolyBoard.set();
      this.canvas.add(voiture);
    });

    var cardImage = new CardImage({
      urlRecto: require("@/assets/ace_spade.png"),
      urlVerso: require("@/assets/verso.png"),
      left: 200,
      top: 150,
    });
    this.canvas.add(cardImage);

    var dice = new DiceNumber({
      left: 500,
      top: 150,
    });
    this.canvas.add(dice);

    let titre = new fabric.Text("POC pour le PAO Boardgame avec fabric.js", {
      fontFamily: "Comic Sans",
      left: 400,
      top: 30,
      id: "titre_de_depart",
      type: "Text",
    });
    this.canvas.add(titre);

    let deck = new Deck({
      left: 30,
      top: 100,
      id: "deck_de_depart",
    });
    this.canvas.add(deck);

    /* Gérer zoom etc */

    this.canvas.on("mouse:wheel", (opt) => {
      let delta = opt.e.deltaY;
      let zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    this.canvas.on("mouse:down", (opt) => {
      let evt = opt.e;
      if (evt.ctrlKey === true) {
        this.canvas.isDragging = true;
        this.canvas.selection = false;
        this.canvas.lastPosX = evt.clientX;
        this.canvas.lastPosY = evt.clientY;
      }
    });

    this.canvas.on("mouse:move", (opt) => {
      if (this.canvas.isDragging) {
        let e = opt.e;
        let vpt = this.canvas.viewportTransform;
        vpt[4] += e.clientX - this.canvas.lastPosX;
        vpt[5] += e.clientY - this.canvas.lastPosY;
        this.canvas.requestRenderAll();
        this.canvas.lastPosX = e.clientX;
        this.canvas.lastPosY = e.clientY;
      }
    });

    this.canvas.on("mouse:up", () => {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.canvas.setViewportTransform(this.canvas.viewportTransform);
      this.canvas.isDragging = false;
      this.canvas.selection = true;
    });

    this.canvas.on("object:moving", this.onChange);
    this.canvas.on("object:scaling", this.onChange);
    this.canvas.on("object:rotating", this.onChange);
    this.canvas.on("object:modified", this.emitObjectModified);
    this.canvas.on("object:modified", this.onChange);

    //event doubleclick pour le dé
    this.canvas.on("mouse:dblclick", (e) => {
      console.log(e.target);
      const object = e.target;
      console.log(object);
      if (object.onDoubleClick !== undefined) {
        console.log("true");
        object.onDoubleClick(this.canvas);
        this.canvas.renderAll();
      }
    });

    /* Gestion des menus */
    this.canvas.on("selection:created", (e) => {
      const object = e.selected[0];
      if (object.getMenu !== undefined) {
        object.getMenu(this.canvas).openMenu(true, object.left, object.top);
      }
    });
    this.canvas.on("object:moving", (e) => {
      const object = e.transform.target;
      if (object.getMenu !== undefined) {
        object.getMenu(this.canvas).openMenu(true, object.left, object.top);
      }
    });
    this.canvas.on("selection:cleared", (e) => {
      const object = e.deselected[0];
      if (object.getMenu !== undefined) {
        object.getMenu(this.canvas).openMenu(false);
      }
    });

    this.emitter.on("create_card", (card) => {
      this.canvas.add(card);
      this.socket.emit("object-added", {
        obj: card,
        obj_id: card.id,
        room: this.room,
      });
    });

    this.socket.emit("init-objects", { room: this.room });
  },
  methods: {
    extendSocket() {
      this.socket.off("new-add");
      this.socket.off("new-modification");
      this.socket.off("init-objects");

      this.socket.on("new-add", (data) => {
        this.addObject(data);
      });

      this.socket.on("new-modification", (data) => {
        this.updateObject(data);
      });

      this.socket.on("init-objects", (data) => {
        for (const obj of data) {
          this.addObject(obj);
        }
      });
    },
    resizeCanvas() {
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      let height = window.innerHeight > 0 ? window.innerHeight : screen.height;
      this.canvas.setWidth(width);
      this.canvas.setHeight(height);
    },
    emitObjectModified(options) {
      if (options.target) {
        this.socket.emit("object-modified", {
          obj: options.target,
          obj_id: options.target.id,
          room: this.room,
        });
      }
    },
    onChange(options, canvas) {
      options.target.setCoords();
      this.canvas.forEachObject(function (obj) {
        if (obj === options.target) return;
        if (options.target.type === "Card" && obj.type === "Deck") {
          let intersects = options.target.intersectsWithObject(obj);

          if (intersects) {
            options.target.controls.addToDeckControl = new fabric.Control({
              x: 0.5,
              y: -0.5,
              offsetY: -60,
              offsetX: -20,
              cursorStyle: "pointer",
              mouseUpHandler: function addToDeck() {
                canvas.remove(options.target);
                delete fabric.Object.prototype.controls.addToDeckControl;
              },
              render: renderAddToDeckIcon,
              cornerSize: 24,
            });

            options.target.set("opacity", 0.9);
            options.target.set("fill", "green");
          } else {
            delete options.target.controls.addToDeckControl;
            options.target.set("opacity", 1);
            options.target.set("fill", options.target.defaultFill);
          }
        }
      });
    },
    addObject(objectToAdd) {
      // we'll pull out the object and id from the data object the socket emitted
      let object_duplicate;
      // check the type of the obj we received and create an object of that type
      if (objectToAdd.type === "Card") {
        object_duplicate = new Card(objectToAdd);
      }
      if (object_duplicate) {
        this.canvas.add(object_duplicate);
        this.canvas.renderAll();
      }
    },
    updateObject(objectToUpdate) {
      // check the objects on our canvas for one with a matching id
      this.canvas.getObjects().forEach((object) => {
        if (object.id === objectToUpdate.id) {
          // set the object on the canvas to the object we received from the socket server
          object.animate(
            { left: objectToUpdate.left, top: objectToUpdate.top },
            {
              duration: 500,
              onChange: this.canvas.renderAll.bind(this.canvas),
            }
          );
          // calling setCoords ensures that the canvas recognizes the object in its new position
          object.set(objectToUpdate);
          object.setCoords();
          this.canvas.renderAll();
        }
      });
    },
  },
};

function renderAddToDeckIcon(ctx, left, top, styleOverride, fabricObject) {
  let icon = require("@/assets/plus.png");
  let img = document.createElement("img");
  img.src = icon;

  let size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}
</script>

<style>
.canvas-container {
  background-color: #caf0f8;
  position: fixed !important;
  bottom: 0;
  left: 0;
}
</style>
