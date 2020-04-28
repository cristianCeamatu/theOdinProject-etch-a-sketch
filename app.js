
// Initial state
let size = 16;
let theme = 'black';
// Populate the grid with initial state
drawGrid(size);

// Change canvas and theme coloring by pressing button
document.querySelector('input#size').addEventListener('change', changeCanvas);
document.querySelector('button#reset').addEventListener('click', changeCanvas);
[...document.querySelectorAll('.sketch-option button')].forEach((button) => button.addEventListener('click', setTheme));

function drawGrid(size) {
    const $canvas = document.querySelector('#canvas');
    const cellSize = $canvas.clientWidth / size;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div');
            cell.style.cssText = `width: ${cellSize}px; height: ${cellSize}px;`;
            cell.style.float = 'left';
            // We use this data variable for the percentage increase of color
            cell.dataOpacity = 0;
            canvas.appendChild(cell);
        }
    }
    // Add event listener to change color on mouseover
    const cells = [...document.querySelectorAll('#canvas div')];
    cells.forEach((cell) => cell.addEventListener('mouseover', changeColor));
}

function setTheme(event) {
    theme = event.target.id;
    document.querySelector('#theme').textContent = (theme == 'reset') ? 'BLACK' : theme.toUpperCase();
}

function changeColor(event) {
    const cell = event.target;   
    switch (theme) {
        case 'random':
            cell.style.background = getRandomColor();
            break;
        case 'percent-increase':
            // Using a dataOpacity counter to increasca opacity
            cell.style.background = 'black';
            cell.dataOpacity += 0.1;
            cell.style.opacity = cell.dataOpacity;
        default:
            cell.style.background = 'black';
    }
}

function changeCanvas(event) {
    const $canvas = document.querySelector('#canvas');
    const $inputSize = document.querySelector('input#size');
    let size = event.target.value;

    // If the size is too big will make the browser crash
    if (size < 2 || size >= 80) {
        confirm('Please select a number betwenn 2 and 80');
        size = 16;
    }

    // Removing old cells
    $canvas.textContent = '';
    // Updating the input field (used it for the Reset option to work with the same function)
    $inputSize.value = size;
    drawGrid(size);
}

function getRandomColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16);
}
