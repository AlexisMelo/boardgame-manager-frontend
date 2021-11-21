import {io} from "socket.io-client";
import {Card} from "@/gameObjects/Card";

export function initializeSocket(canvas, toastLibInstance) {
    let socket = io("http://0.0.0.0:3000", {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000
    })

    socket.off('new-add')
    socket.off('new-modification')

    socket.on('new-add', data => {
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
                fill: obj.fill
            })
        }
        if (object_duplicate) {
            canvas.add(object_duplicate)
            canvas.renderAll()
        }

        toastLibInstance.info(`New ${obj.type} ${obj.label ? `(${obj.label})` : ""} added`, {
            duration: 1000
        })
    })

    socket.on('new-modification', data => {
        console.log("Reçu new-modification")

        const {obj, id} = data
        // check the objects on our canvas for one with a matching id
        canvas.getObjects().forEach(object => {
            if (object.id === id) {
                // set the object on the canvas to the object we received from the socket server
                object.animate({left: obj.left, top: obj.top}, {
                    duration: 500,
                    onChange: canvas.renderAll.bind(canvas)
                })
                // calling setCoords ensures that the canvas recognizes the object in its new position
                object.set(obj)
                object.setCoords()
                canvas.renderAll()
            }
        })
    })

    socket.on("connect", () => {
        toastLibInstance.success("Connexion to the server successful", {
                duration: 2000
            })
    })

    return socket
}