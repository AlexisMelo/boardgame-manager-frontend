<template>
  <canvas id="canvas">
    super canvas
  </canvas>
</template>

<script>
import {fabric} from "fabric";

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
      if (!options.target) {
        let circle = new fabric.Circle({
          left: 300,
          top: 100,
          fill: "green",
          radius: 50
        })

        circle.on("selected", () => {
          console.log("selected")
          canvas.remove(canvas.getActiveObject())
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

    canvas.renderAll()

  }
}
</script>

<style scoped>
#canvas {

}
</style>

<style>
.canvas-container {
  background-color: mistyrose;
  position: fixed !important;
  bottom: 0;
  left: 0;
}
</style>