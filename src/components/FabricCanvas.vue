<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import {fabric} from "fabric";

import {Deck} from "@/gameObjects/Deck";
import {CardImage} from "@/gameObjects/CardImage";
import {Card} from "@/gameObjects/Card";

export default {
  name: "FabricCanvas",
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      canvas: null
    };
  },
  mounted() {
    //Initializing canvas
    let fabric_canvas = new fabric.Canvas("canvas", {
      selectionColor: "rgba(255,0,0,0.2)",
      selectionLineWidth: 5,
      selectionBorderColor: "rgba(255,0,0,0.5)",
    });

    this.canvas = fabric_canvas;

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

    var cardImage = new CardImage({
      url: require("@/assets/ace_spade.png"),
      left: 200,
      top: 150,
    });
    this.canvas.add(cardImage);


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
      this.canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
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

    //this.canvas.on("object:moving", this.emitObjectMoving)
    this.canvas.on("object:moving", this.onChange);
    this.canvas.on("object:scaling", this.onChange);
    this.canvas.on("object:rotating", this.onChange);
    this.canvas.on("object:modified", this.emitObjectModified);
    this.canvas.on("object:modified", this.onChange);

    this.emitter.on("create_card", (card) => {
      this.canvas.add(card);
      this.socket.emit("object-added", {obj: card, id: card.id});
      //canvas.renderAll()
    });
  },
  created() {
    this.extendSocket()
  },
  methods: {
    extendSocket() {
      this.socket.off('new-add')
      this.socket.off('new-modification')

      this.socket.on('new-add', data => {
        console.log("Reçu new-add")
        // we'll pull out the object and id from the data object the socket emitted
        const {obj, id} = data
        let object_duplicate
        // check the type of the obj we received and create an object of that type
        if (obj.type === "Card") {
          object_duplicate = new Card({
            label: obj.label,
            id: id,
            width: obj.width,
            height: obj.height,
            fill: obj.fill,
          })
          object_duplicate.set({left: obj.left, top: obj.top})
        }
        if (object_duplicate) {
          this.canvas.add(object_duplicate)
          this.canvas.renderAll()
          this.$toast.info(`New ${obj.type} ${obj.label ? `(${obj.label})` : ""} added`, {
            duration: 2000
          })
        }

      })

      this.socket.on('new-modification', data => {
        console.log("Reçu new-modification")

        const {obj, id} = data
        // check the objects on our canvas for one with a matching id
        this.canvas.getObjects().forEach(object => {
          if (object.id === id) {
            // set the object on the canvas to the object we received from the socket server
            object.animate({left: obj.left, top: obj.top}, {
              duration: 500,
              onChange: this.canvas.renderAll.bind(this.canvas)
            })
            // calling setCoords ensures that the canvas recognizes the object in its new position
            object.set(obj)
            object.setCoords()
            this.canvas.renderAll()
          }
        })
      })
    },
    resizeCanvas() {
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      let height = window.innerHeight > 0 ? window.innerHeight : screen.height;
      this.canvas.setWidth(width);
      this.canvas.setHeight(height);
    },
    emitObjectMoving(options) {
      this.emitObjectModified(options);
    },
    emitObjectModified(options) {
      if (options.target) {
        const modifiedObj = {
          obj: options.target,
          id: options.target.id,
        };
        this.socket.emit("object-modified", modifiedObj);
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
