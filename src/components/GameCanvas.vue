<template>
  <div>
    <canvas id="canvas"></canvas>
    <div id="menu"></div>
  </div>
</template>

<script>
import {fabric} from "fabric";

import {Card} from "@/gameObjects/Card";
import {canvasMixin} from "@/mixins/canvasMixin";

export default {
  name: "FabricCanvas",
  mixins: [canvasMixin],
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
    this.canvas = this.getCanvasWithControl()

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

    this.socket.emit("init-objects", {room: this.room});
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
              {left: objectToUpdate.left, top: objectToUpdate.top},
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
