export const Menu = class {
    constructor(menuItemArray) {
        this.menuItemArray = menuItemArray
        this.open = false;
    }

    style(menu) {
        const styleSheet = {
            "background-color": "white",
            "list-style": "none",
            "padding": "0",
            "border-radius": "2px",
            "border": "1px solid #111",
            "-webkit-box-shadow": "5px 5px 15px 5px rgba(163, 73, 73, 0.1)",
            "box-shadow": "5px 5px 15px 5px rgba(0, 0, 0, 0.1)",
        }
        for (const property in styleSheet)
            menu.style[property] = styleSheet[property];

        this.menuItemArray[0].addStyle("border-top", "none")
    }

    openMenu(bool, x, y) {
        this.open = bool
        if (bool) {
            this.render(x, y)
        } else {
            this.close()
        }
        return
    }

    render(x, y) {


        this.close()
        const menu = document.createElement("ul");
        this.menuItemArray.forEach(element => {
            menu.append(element.render())
        });

        document.getElementById("menu").append(menu)

        const normalOffSetY = -100
        const secondaryOffSetY = 100

        const normalOffSetX = 50
        const secondaryOffSetX = -100

        y = (y + normalOffSetY < 0) ? y + secondaryOffSetY : y + normalOffSetY
        x = (x + normalOffSetX > window.innerWidth) ? x + secondaryOffSetX : x + normalOffSetX

        menu.style.zIndex = 1000
        menu.style.position = "fixed"
        menu.style.top = `${y}px`
        menu.style.left = `${x}px`
        this.style(menu)
    }

    close() {
        document.getElementById("menu").innerHTML = ''
    }
}
