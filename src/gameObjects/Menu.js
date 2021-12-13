export const Menu = class {
    constructor(menuItemArray) {
        this.menuItemArray = menuItemArray
        this.html = undefined
        this.open = false;
        this.x = 0;
        this.y = 0;
    }

    add(menuItem) {
        this.menuItemArray.append(menuItem)
    }

    style() {
        const normalOffSetY = -100
        const secondaryOffSetY = 100

        const normalOffSetX = 50
        const secondaryOffSetX = -100

        const y = (this.y + normalOffSetY < 0) ? this.y + secondaryOffSetY : this.y + normalOffSetY
        const x = (this.x + normalOffSetX > window.innerWidth) ? this.x + secondaryOffSetX : this.x + normalOffSetX

        const styleSheetUl = {
            "zIndex": "1000",
            "position": "fixed",
            "top": `${y}px`,
            "left": `${x}px`,
            "background-color": "white",
            "list-style": "none",
            "padding": "0",
            "border-radius": "2px",
            "border": "1px solid #111",
            "-webkit-box-shadow": "5px 5px 15px 5px rgba(163, 73, 73, 0.1)",
            "box-shadow": "5px 5px 15px 5px rgba(0, 0, 0, 0.1)",
        }

        const styleSheetDiv = {
            "zIndex": "999",
            "width": "100vw",
            "height": "100vh",
            "position": "fixed",
            "top": "0",
            "left": "0",
        }

        for (const property in styleSheetDiv)
            this.getBack().style[property] = styleSheetDiv[property];

        for (const property in styleSheetUl)
            this.getContextMenu().style[property] = styleSheetUl[property];

        this.menuItemArray[0].addStyle("border-top", "none");
    }

    getBack() {
        return this.html
    }

    getContextMenu() {
        return this.html.children[0]
    }

    openMenu(bool, x, y) {
        this.open = bool
        if (bool) {
            this.x = x;
            this.y = y;

            this.render()
        } else {
            this.close()
        }
        return
    }

    render() {
        this.close()

        const ul = document.createElement("ul");
        const back = document.createElement("div");
        this.html = back
        this.menuItemArray.forEach(element => {
            ul.append(element.render())
        });

        back.addEventListener("click", this.close)
        back.append(ul)
        document.getElementById("menu").append(back)
        this.style()
    }

    close() {
        document.getElementById("menu").innerHTML = ''
    }
}



// export const Menu = function Menu(menuItemArray) {
//     this.menuItemArray = menuItemArray
//     this.open = false;
// }

// Menu.prototype.open = function (bool, x, y) {
//     console.log("Menu.open")
//     this.open = bool
//     if (bool) {
//         this.render(x, y)
//     } else {
//         this.close()
//     }
// }

// Menu.prototype.render = function (x, y) {
//     this.close()
//     const menu = document.createElement("ul");
//     this.menuItemArray.forEach(element => {
//         menu.append(element.render())
//     });

//     document.getElementById("menu").append(menu)

//     const normalOffSetY = -100
//     const secondaryOffSetY = 100

//     const normalOffSetX = 30
//     const secondaryOffSetX = 100

//     y = (y + normalOffSetY < 0) ? y + secondaryOffSetY : y + normalOffSetY
//     x = (x + normalOffSetX > window.innerWidth) ? x + secondaryOffSetX : x + normalOffSetX

//     menu.style.zIndex = 1000
//     menu.style.position = "fixed"
//     menu.style.top = `${y}px`
//     menu.style.left = `${x}px`
//     menu.style.backgroundColor = "white"
// }

// Menu.prototype.close = function () {
//     document.getElementById("menu").innerHTML = ''
// }

