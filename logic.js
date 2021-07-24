const colorButtons = document.querySelectorAll('.color-choice');
const userColorPicker = document.querySelector('#input-color');
const container = document.querySelector('.grid');
const clear_button = document.querySelector('.clear');
var slider = document.querySelector('#sizeRange');

let color = 'black';
createGrid();

function createGrid () {
    n = slider.value;
    container.style.setProperty('--num_of_cells', String(n));

    for (let i=0 ; i<n*n ; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = '';
        cell.addEventListener('mouseover',(e) => {
            cell.style.backgroundColor = color;
        });
        container.appendChild(cell);
    }
    var gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', colorGrid));
}

function colorGrid() {
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.classList.remove('gray');
            break;  
        case 'gray':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                    this.classList.add('gray');
                }
            } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            this.classList.remove('gray');
            break;
        case 'black':
            this.style.backgroundColor = '#000000';
            this.classList.remove('gray');
            break;
        default:
            this.style.backgroundColor = color;
            this.classList.remove('gray');
            break;
    } 
}

function changeColor(event) {
    switch (event.target.dataset.color) { 
        case 'rainbow':
            color = 'rainbow';
            createGrid();
            break;  
        case 'gray':
            color = 'gray';
            createGrid();
            break;
        case 'eraser':
            color = 'eraser';
            createGrid();
            break;
        default:
            color = 'black';
            createGrid();
            break;
    } 
}

function userColorSelection(event) {
    color = event.target.value;
}


slider.addEventListener('mouseup', ()=> {
    let gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
    num_of_cells = slider.value;
    createGrid();
    
})

let cells = container.childNodes
clear_button.addEventListener('click', ()=> {
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });    
});

colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);