/*  */

const X = 12
let alphas = Array(X ** 2).fill(1.0)

const container = document.getElementById("container")
container.style.backgroundColor = "red"
createGrid(container)

let toggle = 0
window.addEventListener("mousedown", () => {toggle = 1})
window.addEventListener("mouseup", () => {toggle = 0})

function createGrid(grid) {
    console.log("build grid")
    for (let i = 0; i < X; i++) {
        const row = document.createElement("div")
        row.classList.add("row")
        row.style.cssText = `
            height: 100%;
            display: flex;
            justify-content: space-evenly;
        `
        for (let j = 0; j < X; j++) {
            const idx = i * X + j
            console.log(alphas[idx])
            const tile = document.createElement("div")
            tile.classList.add("tile")
            tile.setAttribute("id", `${idx}`)
            tile.style.cssText = `
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(38, 169, 230, ${alphas[idx]});
                transition: all .2s;
            `
            tile.addEventListener("mouseover", mouseOver)
            tile.addEventListener("mousedown", mouseDown)
            // tile.addEventListener("mouseout", mouseOut)
            // tile.textContent = `${i*X+j}`
            row.append(tile)
        }
        grid.append(row)
    }
}

function mouseOver(e) {
    if (!toggle) return
    const idx = this.getAttribute("id")
    console.log(idx)
    alphas[idx] -= 0.25
    this.style.backgroundColor = `rgba(38, 169, 230, ${alphas[idx]})`
}

function mouseDown(e) {
    const idx = this.getAttribute("id")
    console.log(idx)
    alphas[idx] -= 0.25
    this.style.backgroundColor = `rgba(38, 169, 230, ${alphas[idx]})`
}

// function mouseOut(e) {
//     if (!toggle) return
//     const idx = this.getAttribute("id")
//     console.log(idx)
//     alphas[idx] -= .05
//     this.style.backgroundColor = `rgba(38, 169, 230, ${alphas[idx]})`
// }
