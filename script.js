/*  */

const X = 4

const container = document.getElementById("container")
createGrid(container)

function createGrid(grid) {
    for (let i = 0; i < X; i++) {
        const row = document.createElement("div")
        row.classList.add("row")
        row.style.cssText = `
            height: 100%;
            display: flex;
            justify-content: space-evenly;
        `
        for (let j = 0; j < X; j++) {
            const tile = document.createElement("div")
            tile.classList.add("tile")
            tile.setAttribute("id", `${i*X + j}`)
            tile.style.cssText = `
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                // border: 1px solid grey;
                background-color: blue;
                // transition: all 0.1s ease-out;
            `
            // tile.addEventListener("mouseenter", handleMouseEnter)
            // tile.addEventListener("mouseover", handleMouseOver)
            // tile.addEventListener("transitionend", handleTransEnd)
            // tile.textContent = `${i*X + j}`
            tile.onmouseover = mouseOver
            tile.onmouseleave = mouseLeave
            row.append(tile)
        }
        grid.append(row)
    }
}

// function handleMouseEnter(e) {
//     console.log(e)
//     console.log(this)
//     this.style.cssText = `
//         background-color: white;
//     ` 
// }

function mouseOver(e) {
    console.log(this)
    this.style.cssText = `
        background-color: yellow;
    ` 
}

function mouseLeave(e) {
    console.log(this)
    this.style.cssText = `
        background-color: blue;
    ` 
}

// function handleTransEnd(e) {
//     this.style.cssText = `
//         background-color: blue;
//     `
// }