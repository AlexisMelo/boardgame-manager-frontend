<template>
  <canvas id="canvas">
  </canvas>
</template>

<script>
import {fabric} from "fabric";
import {Card} from "@/gameObjects/Card";
import {Deck} from "@/gameObjects/Deck";

export default {
  name: "FabricCanvas",
  mounted() {
    let canvas = new fabric.Canvas("canvas", {
      selectionColor: "rgba(255,0,0,0.2)",
      selectionLineWidth: 5,
      selectionBorderColor: "rgba(255,0,0,0.5)",
    })
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    canvas.setWidth(width)
    canvas.setHeight(height)


    let rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 100,
      height: 100
    })

    canvas.add(rect)
    canvas.setActiveObject(rect)

    fabric.Image.fromURL(require("@/assets/monopoly-classique-plateau.jpg"), (oImg) => {
      oImg.scale(0.5)
      canvas.add(oImg)
    })

    let titre = new fabric.Text("POC pour le PAO Boardgame avec fabric.js", {
      fontFamily: "Comic Sans",
      left: 300,
      top: 100
    })
    canvas.add(titre)

    canvas.on("mouse:down", (options) => {
      if (!options.target && options.e.altKey) {
        let circle = new fabric.Circle({
          left: 300,
          top: 100,
          fill: "green",
          radius: 50
        })

        circle.on("selected", (opt) => {
          let evt = opt.e;
          if (evt.shiftKey) {
            canvas.remove(canvas.getActiveObject())
          }
        })

        canvas.add(circle)
      }
    })

    canvas.on('mouse:wheel', (opt) => {
      let delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    })

    canvas.on('mouse:down', (opt) => {
      let evt = opt.e;
      if (evt.ctrlKey === true) {
        canvas.isDragging = true;
        canvas.selection = false;
        canvas.lastPosX = evt.clientX;
        canvas.lastPosY = evt.clientY;
      }
    })

    canvas.on('mouse:move', (opt) => {
      if (canvas.isDragging) {
        let e = opt.e;
        let vpt = canvas.viewportTransform;
        vpt[4] += e.clientX - canvas.lastPosX;
        vpt[5] += e.clientY - canvas.lastPosY;
        canvas.requestRenderAll();
        canvas.lastPosX = e.clientX;
        canvas.lastPosY = e.clientY;
      }
    })

    canvas.on('mouse:up', () => {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      canvas.setViewportTransform(canvas.viewportTransform);
      canvas.isDragging = false;
      canvas.selection = true;
    });

    fabric.Object.prototype.controls.rotateControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -30,
      offsetX: -10,
      cursorStyle: "pointer",
      mouseUpHandler: rotateObject,
      render: renderIcon,
      cornerSize: 24
    })

    let carte = new Card({
      label: "1 PIQUE",
      left: 200
    })
    let deck = new Deck()

    canvas.add(carte)
    canvas.add(deck)

    canvas.on({
      'object:moving': onChange,
      'object:scaling': onChange,
      'object:rotating': onChange
    })




    function onChange(options) {
      options.target.setCoords()
      canvas.forEachObject(function(obj) {
        if (obj === options.target) return
        if (options.target.type === "Card" && obj.type === "Deck") {
          let intersects = options.target.intersectsWithObject(obj)

          if (intersects) {
            console.log(`Intersection entre ${obj} et ${options.target}`)
            console.log(options.target)
            console.log(options.target.controls)
            options.target.controls.addToDeckControl = new fabric.Control({
              x: 0.5,
              y: -0.5,
              offsetY: -60,
              offsetX: -20,
              cursorStyle: "pointer",
              mouseUpHandler: function addToDeck() {
                console.log("ajouté au deck")
                canvas.remove(options.target)
                delete fabric.Object.prototype.controls.addToDeckControl
              },
              render: renderAddToDeckIcon,
              cornerSize: 24
            })

            options.target.set('opacity',0.90)
            options.target.set("fill", "green")
          } else {
            delete options.target.controls.addToDeckControl
            options.target.set('opacity',1)
            options.target.set("fill", options.target.defaultFill)
          }
        }
      })
    }


  }
}



function rotateObject(eventData, transform) {
  let target = transform.target
  target.rotate(target.angle + 90)
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  let rotateIcon = require("@/assets/rotating-arrow-symbol.png")
  let img = document.createElement("img")
  img.src = rotateIcon

  let size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore();
}

function renderAddToDeckIcon(ctx, left, top, styleOverride, fabricObject) {
  let icon = require("@/assets/plus.png")
  let img = document.createElement("img")
  img.src = icon

  let size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore();
}

</script>

<style>
.canvas-container {
  background-color: mistyrose;
  position: fixed !important;
  bottom: 0;
  left: 0;
}
</style>