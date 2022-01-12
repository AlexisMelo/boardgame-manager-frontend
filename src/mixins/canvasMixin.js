import { fabric } from "fabric";
import {Card} from "@/gameObjects/Card";
import {Piece} from "@/gameObjects/Piece";
import {DiceNumber} from "@/gameObjects/DiceNumber";
import {CardImage} from "@/gameObjects/CardImage";
import {DiceImage} from "@/gameObjects/DiceImage";
import {Deck} from "@/gameObjects/Deck";
import {ImageApp} from "@/gameObjects/ImageApp";

export const canvasMixin = {
    methods: {
        getCanvasWithControl() {
            let canvas = new fabric.Canvas("canvas", {
                selectionColor: "rgba(255,0,0,0.2)",
                selectionLineWidth: 5,
                selectionBorderColor: "rgba(255,0,0,0.5)",
                fireRightClick: true,  // <-- enable firing of right click events
                fireMiddleClick: true, // <-- enable firing of middle click events
                stopContextMenu: true, // <--  prevent context menu from showing
            })

            window.addEventListener("resize", () => {
                this.resizeCanvas(canvas);
            });
            this.resizeCanvas(canvas);

            canvas.on("mouse:wheel", (opt) => {
                let delta = opt.e.deltaY;
                let zoom = canvas.getZoom();
                zoom *= 0.999 ** delta;
                if (zoom > 20) zoom = 20;
                if (zoom < 0.01) zoom = 0.01;
                canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });

            canvas.on("mouse:down", (opt) => {
                let evt = opt.e;
                if (evt.ctrlKey === true) {
                    canvas.isDragging = true;
                    canvas.selection = false;
                    canvas.lastPosX = evt.clientX;
                    canvas.lastPosY = evt.clientY;
                }
            });

            canvas.on("mouse:move", (opt) => {
                if (canvas.isDragging) {
                    let e = opt.e;
                    let vpt = canvas.viewportTransform;
                    vpt[4] += e.clientX - canvas.lastPosX;
                    vpt[5] += e.clientY - canvas.lastPosY;
                    canvas.requestRenderAll();
                    canvas.lastPosX = e.clientX;
                    canvas.lastPosY = e.clientY;
                }
            });

            canvas.on("mouse:up", () => {
                // on mouse up we want to recalculate new interaction
                // for all objects, so we call setViewportTransform
                canvas.setViewportTransform(canvas.viewportTransform);
                canvas.isDragging = false;
                canvas.selection = true;
            });

            return canvas
        },
        resizeCanvas(canvas) {
            let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            let height = window.innerHeight > 0 ? window.innerHeight : screen.height;
            canvas.setWidth(width);
            canvas.setHeight(height);
        },
        addObjectToCanvas(canvas, objectToAdd) {
            // we'll pull out the object and id from the data object the socket emitted
            if (!objectToAdd.id) {
                return; //éviter doublons parfois ou autre bug
            }

            switch (objectToAdd.type) {
                case "Card":
                    this._addToCanvas(new Card(objectToAdd));
                    break;
                case "Piece":
                    this._addToCanvas(new Piece(objectToAdd));
                    break;
                case "DiceNumber":
                    this._addToCanvas(new DiceNumber(objectToAdd));
                    break;
                case "CardImage":
                    this._addToCanvas(new CardImage(objectToAdd));
                    break;
                case "DiceImage":
                    this._addToCanvas(new DiceImage(objectToAdd));
                    break;
                case "Deck":
                    fabric.util.loadImage(objectToAdd.src, (img) => {
                        this._addToCanvas(canvas, new Deck(img, objectToAdd))
                    })
                    break;
                case "ImageApp":
                    fabric.util.loadImage(objectToAdd.src, (img) => {
                        this._addToCanvas(canvas, new ImageApp(img, objectToAdd))
                    })
                    break;
            }
        },
        _addToCanvas(canvas, objectToAdd) {
            canvas.add(objectToAdd)
            canvas.requestRenderAll()
        }
    }
}