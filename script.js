/*  */

let gridSize = 32
let brushAlphas = Array(gridSize ** 2).fill(0.0)
let canvasColor = "rgb(240, 255, 255)"
let brushColor = "rgb(0, 255, 255)"
let brushIntensity = 0.2

// color transforms
function hexRgb(hex) {
    /* #123456 -> rgb(12, 34, 56) */
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
}
function rgbAlpha(rgb, alpha = 1.0) {
    /* rgb(11, 22, 33) -> rgb(11, 22, 33, .44) */
    return `rgba(${rgb.replace("rgb(", "").replace(")", "")}, ${alpha})`
}

// handle inputs
const canvasColorInput = document.getElementById("canvas-color")
canvasColorInput.addEventListener("input", inputCanvasColor)
function inputCanvasColor(e) {
    canvasColor = hexRgb(e.target.value)
}
const brushColorInput = document.getElementById("brush-color")
brushColorInput.addEventListener("input", inputBrushColor)
function inputBrushColor(e) {
    brushColor = hexRgb(e.target.value)
}
const brushIntensityInput = document.getElementById("brush-intensity")
brushIntensityInput.addEventListener("input", inputBrushIntensity)
function inputBrushIntensity(e) {
    brushIntensity = e.target.value / 100
}
const gridSizeInput = document.getElementById("grid-size")
gridSizeInput.addEventListener("input", inputGridSize)
function inputGridSize(e) {
    gridSize = e.target.value
}

// create grid and tile event listeners
function createGrid() {
    const canvas = document.getElementById("canvas")
    canvas.style.backgroundColor = canvasColor
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("div")
        row.classList.add("row")
        row.style.cssText = `
            height: 100%;
            display: flex;
            justify-content: space-evenly;
        `
        for (let j = 0; j < gridSize; j++) {
            const idx = i * gridSize + j
            const tile = document.createElement("div")
            tile.classList.add("tile")
            tile.setAttribute("id", `${idx}`)
            tile.style.cssText = `
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: ${rgbAlpha(brushColor, brushAlphas[idx])};
                transition: all .2s;
            `
            tile.addEventListener("mouseover", mouseOverDraw)
            tile.addEventListener("mousedown", mouseDownDraw)
            row.append(tile)
        }
        canvas.append(row)
    }
}

// mouse down/up toggle
let toggle = 0
window.addEventListener("mousedown", () => {
    toggle = 1
})
window.addEventListener("mouseup", () => {
    toggle = 0
})

// draw 1
function mouseOverDraw(e) {
    if (!toggle) return
    const idx = this.getAttribute("id")
    if (brushAlphas[idx] < 1) brushAlphas[idx] += brushIntensity
    this.style.backgroundColor = rgbAlpha(brushColor, brushAlphas[idx])
}

// draw 2
function mouseDownDraw(e) {
    const idx = this.getAttribute("id")
    if (brushAlphas[idx] < 1) brushAlphas[idx] += brushIntensity
    this.style.backgroundColor = rgbAlpha(brushColor, brushAlphas[idx])
}

// reset canvas button
const resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", handleResetButton)
function handleResetButton() {
    document.getElementById("canvas").innerHTML = ``
    brushAlphas = Array(gridSize ** 2).fill(0.0)
    createGrid()
}

// initialise canvas
createGrid()
